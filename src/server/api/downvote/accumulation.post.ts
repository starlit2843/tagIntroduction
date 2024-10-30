import { adminFirestore } from "../config/firebaseConfig";
import { getTodayDate, getDate } from "../utils/time";

const setAccumulation = async () => {
  try {
    const db = adminFirestore;
    const yyyymmdd = getTodayDate();

    const nowDownvoteDoc = db.collection("downvote").doc(yyyymmdd);
    const nowDownvoteData = await nowDownvoteDoc.get();

    let yesterdayDownvoteCount = 0;
    let yesterdayDownvoteAccumulation = 0;

    if (nowDownvoteData.exists && !nowDownvoteData.data()?.accumulation) {
      const yyyymmddYesterday = getDate(
        new Date().setDate(new Date().getDate() - 1)
      );

      const yesterdayDownvoteDoc = db
        .collection("downvote")
        .doc(yyyymmddYesterday);
      const yesterdayDownvoteData = await yesterdayDownvoteDoc.get();

      if (yesterdayDownvoteData.exists) {
        yesterdayDownvoteCount = yesterdayDownvoteData.data()?.count ?? 0;
        yesterdayDownvoteAccumulation =
          yesterdayDownvoteData.data()?.accumulation ?? 0;
      }

      nowDownvoteDoc.set(
        {
          accumulation: yesterdayDownvoteAccumulation + yesterdayDownvoteCount,
        },
        { merge: true }
      );

      return {
        success: true,
        data: {
          accumulation: yesterdayDownvoteAccumulation + yesterdayDownvoteCount,
        },
      };
    }

    return {
      success: true,
      message: "accumulation has been recorded. Nothing to do. ",
    };

    // console.log(response);
  } catch (err: any) {
    console.log("Error: " + err.message);
    return {
      success: false,
      message: err.message,
      data: {},
    };
  }
};

export default defineEventHandler(async () => {
  return await setAccumulation();
});
