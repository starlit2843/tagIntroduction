import { adminFirestore, verifyToken } from "../config/firebaseConfig";

export default defineEventHandler(async (event) => {
  try {
    const idToken = getRequestHeader(event, "authorization")?.split(
      "Bearer "
    )[1];
    let id: string;
    if (idToken) {
      id = await verifyToken(idToken);
    } else {
      id = getQuery(event).id as string;
    }
    const db = adminFirestore;

    const collectionList = (
      await db.collection("what2eat_saved-collections").doc(id).get()
    ).data()?.collectionList as What2EatCollectionListType[];

    for (const collection of collectionList) {
      const authorDoc = (
        await db.collection("profile").doc(collection.authorId).get()
      ).data();
      const opentag = authorDoc?.customize_id;
      if (opentag) collection.author = opentag;
      else collection.author = "open.nccu";

      const collectionDoc = (
        await db.collection("what2eat_collections").doc(collection.id).get()
      ).data();
      const collectionName = collectionDoc?.name;
      const collectionCover = collectionDoc?.cover;
      if (collectionName) {
        collection.name = collectionName;
        collection.cover = collectionCover;
      }
    }

    return collectionList;
  } catch (error: any) {
    sendError(event, error, true);
  }
});
