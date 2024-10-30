import { adminFirestore } from "../config/firebaseConfig";

type CollectionType = {
  authorUid: string;
  cover: string;
  name: string;
  pool: { icon: string; name: string; shopId: string }[];
  public: boolean;
  savedCount: number;
};

export default defineEventHandler(async (event) => {
  try {
    const db = adminFirestore;
    const { collectionId } = getQuery(event);
    const collection = await db
      .collection("what2eat_collections")
      .doc(collectionId as string)
      .get();

    return collection.data() as CollectionType;
  } catch (error: any) {
    sendError(event, error, true);
  }
});
