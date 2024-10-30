import admin from "firebase-admin";
import {
  initializeApp,
  getApp,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import certJson from "../../../../cert.json";
import { getStorage } from "firebase-admin/storage";

const checkApp = (appName: string) => {
  return getApps().filter((app) => app.name === appName).length;
};

const app = !getApps().length
  ? initializeApp({
      credential: admin.credential.cert(certJson as ServiceAccount),
    })
  : getApp();
const adminAuth = getAuth(app);
const adminFirestore = getFirestore(app);
adminFirestore.settings({ ignoreUndefinedProperties: true });
const adminStorage = getStorage(app);

export default app;
export { adminAuth, adminFirestore, adminStorage };
export const authDatabaseUrl =
  "https://opennccu-tw-auth-code.asia-southeast1.firebasedatabase.app/";
export const authTokenDatabaseUrl =
  "https://opennccu-tw-access-token.asia-southeast1.firebasedatabase.app/";

export const verifyToken = async (idToken: string) => {
  // idToken comes from the client app
  const checkRevoked = true;
  try {
    if (idToken === "undefined") {
      throw new Error("Invalid Token");
    }
    const decodedToken = await getAuth().verifyIdToken(idToken, checkRevoked);
    return decodedToken.uid;
  } catch (err) {
    console.error(err);
    console.error(
      "\nIn the error message there are two possible course (1) wrong or expired credentials. (2)re-sync the time on your server"
    );
    throw err;
  }
};
