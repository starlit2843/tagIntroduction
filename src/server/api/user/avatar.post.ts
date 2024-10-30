import { adminStorage } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";

const uploadAvatar = async (body: any, uid: string) => {
  try {
    const image = body.get("image") as any;
    const type = image.split(";")[0].split(":")[1];
    const buffer = Buffer.from(image.split(",")[1], "base64");
    // const blob = new Blob([buffer], { type: type });

    const file = adminStorage
      .bucket(`${useRuntimeConfig().public.firebaseProjectId}.appspot.com`)
      .file(`avatar/${uid}`);

    const stream = file.createWriteStream({
      metadata: {
        contentType: type,
      },
    });

    stream.end(buffer);

    return {
      success: true,
      data: {
        url: `https://firebasestorage.googleapis.com/v0/b/opennccu-tw.appspot.com/o/avatar%2F${uid}.png?alt=media`,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};
export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  //使用者身分
  const uid = await verifyTokenMiddleware(event);

  return await uploadAvatar(body, uid);
});
