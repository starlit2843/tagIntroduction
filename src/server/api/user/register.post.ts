import { adminFirestore } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";
import { z } from "zod";
import { readBody } from "h3";
import { deptSchema } from "~/types/profile";

export default defineEventHandler(async (event) => {
  try {
    const uid = await verifyTokenMiddleware(event);
    const body = await readBody(event);
    if (!body) throw new Error("empty body");
    const data = deptSchema.parse(body);

    const productsData = adminFirestore.collection("dept");

    await productsData.doc(uid).set(data);

    return productsData;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
