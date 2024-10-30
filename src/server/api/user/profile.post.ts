import { adminFirestore } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";
import { z } from "zod";
import {
  profileSchema,
  SHARE_URL_SIZE_LIMIT,
  SHARE_URL_LIMIT,
  APIError,
  TIMED_URL_LIMIT,
} from "~/types/profile";
import { H3Error } from "h3";

class FieldError extends H3Error {
  constructor(err: APIError) {
    super(err.message);
    this.data = err;
  }
}

export default defineEventHandler(async (event) => {
  try {
    const uid = await verifyTokenMiddleware(event);
    const body = await readBody(event);
    if (!body) throw new Error("empty body");
    const partialProfile = profileSchema.partial().parse(body.partialProfile);

    const {
      nickname,
      customize_id,
      bio,
      share_urls,
      timed_urls,
      timed_urls_deadtime,
    } = partialProfile;
    const profileCollection = adminFirestore.collection("profile");

    // 檢查是否有重複的自訂ID
    if (customize_id) {
      const profileDocs = await profileCollection
        .where("customize_id", "==", customize_id)
        .get();
      if (!profileDocs.empty) {
        if (profileDocs.docs[0].id !== uid) {
          throw new FieldError({
            type: "FIELD_ERROR",
            message: "這個用戶名稱已經被搶先啦！",
          });
        }
      }
    }
    // 檢查是否有重複的暱稱
    if (nickname) {
      const profileDocs = await profileCollection
        .where("nickname", "==", nickname)
        .get();
      if (!profileDocs.empty) {
        if (profileDocs.docs[0].id !== uid) {
          throw new FieldError({
            type: "FIELD_ERROR",
            message: "此暱稱已被使用",
          });
        }
      }
    }
    // 檢查自我介紹
    if (bio) {
      if (bio.length > 100) {
        throw new FieldError({
          type: "FIELD_ERROR",
          message: "字數過多，請縮減至 100 字元",
        });
      }
    }
    // 檢查分享連結
    if (share_urls) {
      // 數量限制
      if (share_urls.length > SHARE_URL_LIMIT) {
        throw new FieldError({
          type: "FIELD_ERROR",
          message: `最多${SHARE_URL_LIMIT}個公開連結`,
        });
      }
      // 長度限制
      for (const share_url of share_urls) {
        if (share_url.length > SHARE_URL_SIZE_LIMIT) {
          throw new FieldError({
            type: "FIELD_ERROR",
            message: `連結最長${SHARE_URL_SIZE_LIMIT}個字`,
          });
        }
      }
    }

    // 檢查限時連結
    if (timed_urls) {
      // 數量限制
      if (timed_urls.length > TIMED_URL_LIMIT) {
        throw new FieldError({
          type: "FIELD_ERROR",
          message: `最多${TIMED_URL_LIMIT}個限時連結`,
        });
      }
      // 長度限制
      for (const timed_url of timed_urls) {
        if (timed_url.length > SHARE_URL_SIZE_LIMIT) {
          throw new FieldError({
            type: "FIELD_ERROR",
            message: `連結最長${SHARE_URL_SIZE_LIMIT}個字`,
          });
        }
      }
    }

    // 檢查限時連結到期時間
    if (timed_urls_deadtime) {
      // 數量限制
      if (timed_urls_deadtime.length > TIMED_URL_LIMIT) {
        throw new FieldError({
          type: "FIELD_ERROR",
          message: `最多${TIMED_URL_LIMIT}個限時連結`,
        });
      }
      // 截止日限制
      for (const deadtime of timed_urls_deadtime) {
        const now = new Date().getTime();
        if (deadtime > now + 1000 * 60 * 60) {
          // 設定的時間超過1小時
          throw new FieldError({
            type: "FIELD_ERROR",
            message: `到期時間最久設1小時`,
          });
        } /*  else if (deadtime !== 0 && deadtime < now) {
          // 設定的時間在過去，並且也不是特殊的0代表刪除
          // 此功能檢查關閉，因為在儲存其他的連結時，舊的、已經過期的連結會導致這個儲存是失敗的
          throw new FieldError({
            type: "FIELD_ERROR",
            message: "到期時間不可設在過去",
          });
        } */
      }
    }

    // 更新使用者資料
    await profileCollection.doc(uid).set(partialProfile, { merge: true });
    // const newProfileDoc = await profileCollection.doc(uid).get();
    // const profileDoc = newProfileDoc.data();

    // return profileDoc;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Error when posting user profile:\n", error.issues);
      sendError(
        event,
        new FieldError({ type: "PROGRAM_ERROR", message: "內部格式錯誤" }),
        process.env.NODE_ENV === "development"
      );
    } else if (error instanceof FieldError) {
      sendError(event, error, process.env.NODE_ENV === "development");
    } else {
      console.error("unknown error in profile.post.ts", "\n", error);
      sendError(
        event,
        new FieldError({ type: "UNKNOWN", message: "未知錯誤" }),
        process.env.NODE_ENV === "development"
      );
    }
  }
});
