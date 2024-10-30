import { adminFirestore } from "../config/firebaseConfig";
import { getTodayDate } from "../utils/time";

const addDownvote = async () => {
  try {
    const db = adminFirestore;
    const yyyymmdd = getTodayDate();
    const downvoteFirebaseDoc = db.collection("downvote").doc(yyyymmdd);
    const nowDownvoteData = await downvoteFirebaseDoc.get();

    let nowDownvoteCount = 0;
    if (nowDownvoteData.exists) {
      nowDownvoteCount = nowDownvoteData.data()?.count ?? 0;
    }

    downvoteFirebaseDoc.set(
      {
        count: nowDownvoteCount + 1,
      },
      { merge: true }
    );

    return {
      success: true,
      data: {
        count: nowDownvoteCount + 1,
      },
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

const checkVoted = async (ip: string) => {
  const db = adminFirestore;
  const todayDate = getTodayDate();
  const downvoteFirebaseData = db
    .collection("downvote")
    .doc(todayDate)
    .collection("voted");

  const doc = await downvoteFirebaseData.where("ip", "==", ip).get();
  if (doc.empty) {
    return false;
  }
  return true;
};

const addVoted = async (ip: string) => {
  const db = adminFirestore;
  const todayDate = getTodayDate();
  const downvoteFirebaseData = db
    .collection("downvote")
    .doc(todayDate)
    .collection("voted");
  downvoteFirebaseData.add({
    ip: ip,
  });
};
export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, "x-forwarded-for") ?? "";
  const voted = await checkVoted(ip);
  if (voted) {
    return {
      success: false,
      message: "You have already voted today.",
      data: {},
    };
  }
  await addVoted(ip);
  return await addDownvote();
});
