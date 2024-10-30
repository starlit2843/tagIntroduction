import { adminStorage } from "~/server/api/config/firebaseConfig";
import { verifyTokenMiddleware } from "~/server/api/utils/verifier";
import { z } from "zod";

import { getDownloadURL } from "firebase-admin/storage";

export default defineEventHandler(async (event) => {
  try {
    const uid = await verifyTokenMiddleware(event);

    const storage = adminStorage
      .bucket("opennccu-tw.appspot.com")
      .file(`avatar/${uid}`);

    const avatarUrl = await getDownloadURL(storage);
    return {
      success: true,
      data: {
        url: avatarUrl,
      },
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
