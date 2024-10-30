import { getFirestore, doc, getDoc } from "firebase/firestore";
export const useJson = async (param: any) => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return;
  const idToken = await user.getIdToken();

  return $fetch("/api/user/iNCCUDataUpload", {
    headers: { authorization: "Bearer " + idToken },
    method: "post",
    body: param,
  });
};

export const getJson = async () => {
  const { $firebaseApp, $firebaseAuth } = useNuxtApp();

  const db = getFirestore($firebaseApp);
  const user = $firebaseAuth.currentUser;
  if (!user) return JSON.parse("{}");
  const uid = user.uid;
  const inccuRef = doc(db, "inccu", uid);
  const inccuDoc = await getDoc(inccuRef);
  if (inccuDoc.exists()) {
    console.log("Document data:", inccuDoc.data());
    return JSON.parse(JSON.stringify(inccuDoc.data()));
  } else {
    console.log("No such document!");
    return JSON.parse("{}"); // docSnap.data() will be undefined in this case
  }
};
