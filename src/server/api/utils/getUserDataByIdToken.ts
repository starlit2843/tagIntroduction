import { adminAuth } from "~/server/api/config/firebaseConfig";

interface UserData {
  name?: string;
  email?: string;
}
interface Profile {
  customize_id?: string;
}
interface UserProfile {
  profile?: Profile;
}

export const getUserDataByIdToken = async (headers: any): Promise<any> => {
  try {
    const idToken: string = headers.authorization?.split(" ")[1];
    if (!idToken) {
      throw new Error("idToken is missing");
    }
    const [decodedData, decodedProfile]: [UserData, UserProfile] =
      await Promise.all([
        adminAuth.verifyIdToken(idToken),
        $fetch<UserProfile>("/api/user/profile", {
          headers: { authorization: `Bearer ${idToken}` },
        }),
      ]);
    const result = {
      userData: decodedData,
      userProfile: decodedProfile.profile,
    };
    return { success: true, message: "OK", data: result };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
