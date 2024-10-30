import { adminFirestore } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";
import { z } from "zod";
import { getDefaults } from "~/utils/zodDefault";
import { deptSchema, profileSchema, Inccu, Classes } from "~/types/profile";

export default defineEventHandler(async (event) => {
  try {
    const uid = await verifyTokenMiddleware(event);
    const year = new Date().getFullYear() - 1911;
    const month = new Date().getMonth() + 1;
    const academicYear = year - (month < 8 ? 1 : 0);
    const sem = month > 2 && month < 8 ? "2" : "1";

    const dept = await adminFirestore.collection("dept").doc(uid).get();
    const profile = await adminFirestore.collection("profile").doc(uid).get();
    const inccu = await adminFirestore.collection("inccu").doc(uid).get();

    const deptData = dept.data();
    const profileData = profile.data();
    const inccuData = inccu.data();

    if (!profileData) {
      await adminFirestore
        .collection("profile")
        .doc(uid)
        .set(getDefaults(profileSchema));
    }

    return {
      dept: deptData || getDefaults(deptSchema),
      profile: {
        ...getDefaults(profileSchema),
        ...profileData,
      },
      inccu: (inccuData ? inccuData.originData : []) as Inccu,
      classes: (inccuData
        ? "課業學習" in inccuData
          ? inccuData["課業學習"].creditDataArray
              .filter(
                (course: any) => course.YYSMT === `${academicYear} ${sem}`
              )
              .map((course: any) => course.subNum)
          : []
        : []) as Classes,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
