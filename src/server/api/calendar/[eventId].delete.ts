import { authorize, checkPermission } from "~/server/api/utils/calendar";
import { google } from "googleapis";

const removeEvent = async (eventId: string) => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    await new Promise<void>((resolve, reject) => {
      calendar.events.delete(
        {
          auth: auth,
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          eventId: eventId,
        },
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
    return { success: true, message: `Event deleted: ${eventId}` };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
export default defineEventHandler(async (event: any) => {
  setResponseStatus(event, 200, "OK");
  setResponseHeaders(event, { "content-type": "application/json" });
  try {
    const headers = getHeaders(event);
    const pass = await checkPermission(headers);
    if (!pass.success) {
      return JSON.stringify(pass, null, 4);
    }
    const { eventId }: any = event.context.params;
    if (!eventId) {
      const result: any = { success: false, message: "Bad request" };
      return JSON.stringify(result, null, 4);
    }
    const result = await removeEvent(eventId);
    return JSON.stringify(result, null, 4);
  } catch (error) {
    return JSON.stringify(
      { success: false, message: (error as Error).message },
      null,
      4
    );
  }
});
