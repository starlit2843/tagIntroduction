import { adminFirestore } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";

export default defineEventHandler(async (event) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new Error();
    const uid = await verifyTokenMiddleware(event);

    await adminFirestore.collection("dept").doc(uid).delete();
    await adminFirestore.collection("profile").doc(uid).delete();
    await adminFirestore.collection("inccu").doc(uid).delete();

    return {
      success: true,
      uid: uid,
    };
  } catch (error: any) {
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
