import { adminFirestore } from "~/server/api/config/firebaseConfig";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || { id: "" };
    const profileDocs = await adminFirestore
      .collection("profile")
      .where("customize_id", "==", id)
      .get();

    if (profileDocs.empty) {
      return null;
    }

    return profileDocs.docs[0].data();
  } catch (error: any) {
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
