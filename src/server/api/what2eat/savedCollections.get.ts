import { adminFirestore, verifyToken } from "../config/firebaseConfig";

type Collection = { id: string; cover: string; name: string }[];

export default defineEventHandler(async (event) => {
  try {
    const idToken = getRequestHeader(event, "authorization")?.split(
      "Bearer "
    )[1];
    if (!idToken) throw new Error("token required");
    const uid = await verifyToken(idToken);
    const db = adminFirestore;
    const savedCollections = await db
      .collection("what2eat_saved-collections")
      .doc(uid)
      .get();

    if (!savedCollections.exists) {
      await db
        .collection("what2eat_saved-collections")
        .doc(uid)
        .set({ collectionList: [] });
      return [] as Collection;
    }

    return (savedCollections.data()?.collections ?? []) as Collection;
  } catch (error: any) {
    sendError(event, error, true);
  }
});
