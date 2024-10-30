import { authorize, checkPermission } from "~/server/api/utils/calendar";
import { google } from "googleapis";

const listEvents = async () => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    const result: any = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          timeMin: new Date().toISOString(),
          // maxResults: 100,
          singleEvents: true,
          orderBy: "startTime",
        },
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    const events = result.data.items;
    if (!events || events.length === 0) {
      return { success: true, message: "No events found.", data: [] };
    }
    return { success: true, message: "OK", data: events };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200, "OK");
  setResponseHeaders(event, { "content-type": "application/json" });
  try {
    const headers = getHeaders(event);
    const pass = await checkPermission(headers);
    if (!pass.success) {
      return JSON.stringify(pass, null, 4);
    }
    const result = await listEvents();
    return JSON.stringify(result, null, 4);
  } catch (error) {
    return JSON.stringify(error, null, 4);
  }
});
