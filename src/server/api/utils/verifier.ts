import { verifyToken } from "../config/firebaseConfig";
export const verifyTokenMiddleware = async (event: any) => {
  const idToken = getRequestHeader(event, "authorization")?.split("Bearer ")[1];
  if (!idToken) throw new Error("idToken required");
  const uid = await verifyToken(idToken);
  return uid;
};
