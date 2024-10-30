import { adminFirestore, verifyToken } from "./config/firebaseConfig";
import { z, zh } from "h3-zod";

const iNCCUKeys = [
  "基本資料",
  "學籍歷程",
  "課業學習",
  "能力展現",
  "健康常識",
  "多元生活",
  "心靈互動",
  "榮譽服務",
  "修課計畫 所有明細",
];

export default defineEventHandler(async (event) => {
  try {
    const idToken = getRequestHeader(event, "authorization")?.split(
      "Bearer "
    )[1];
    if (!idToken) throw new Error("idToken required");
    const uid = await verifyToken(idToken);

    const objectInJson = z.object({});
    const schema = z.object({
      data: z.array(objectInJson),
    });
    const body = await zh.useSafeValidatedBody(event, schema);

    const { data } = await readBody(event);

    const iNCCUData = {} as any;
    data.forEach((item: any) => {
      const itemKey = Object.keys(item)[0];
      if (iNCCUKeys.includes(itemKey)) {
        // console.log(item[itemKey]);
        iNCCUData[itemKey] = item[itemKey];
      }
    });

    adminFirestore.collection("inccu").doc(uid).set(iNCCUData);
    return iNCCUData;
  } catch (error: any) {
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
