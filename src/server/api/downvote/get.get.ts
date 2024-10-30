import { adminFirestore } from "../config/firebaseConfig";
import { getTodayDate } from "../utils/time";

async function getDownvoteCount() {
  try {
    const db = adminFirestore;
    // get now date. format: yyyymmdd
    const yyyymmdd = getTodayDate();
    console.log(yyyymmdd);
    //
    const downvoteDoc = db.collection("downvote").doc(yyyymmdd);
    const downvoteData = await downvoteDoc.get();
    const nowDownvoteCount = downvoteData.data()?.count ?? 0;
    const nowDownvoteAccumulation = downvoteData.data()?.accumulation ?? 0;
    return {
      success: true,
      data: {
        count: nowDownvoteCount,
        accumulation: nowDownvoteAccumulation,
        date: yyyymmdd,
      },
    };
  } catch (err: any) {
    console.log("Error: " + err.message);
    return {
      success: false,
      messge: err.message,
      data: {},
    };
  }
}

export default defineEventHandler(async () => {
  // return await getData();
  return await getDownvoteCount();
});
