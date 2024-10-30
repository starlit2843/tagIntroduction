import { adminFirestore } from "../config/firebaseConfig";
import { verifyTokenMiddleware } from "../utils/verifier";

export default defineEventHandler(async (event) => {
  const uid = await verifyTokenMiddleware(event);
  const body = await readBody(event);
  const data = {
    authorUid: uid,
    cover: "",
    name: body.name,
    pool: body.pool,
    public: true,
    savedCount: 0,
  };
  return await adminFirestore.collection("what2eat_collections").add(data);
});
