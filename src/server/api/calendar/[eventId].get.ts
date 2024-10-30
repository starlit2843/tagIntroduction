import { authorize, checkPermission } from "~/server/api/utils/calendar";
import { google } from "googleapis";

const queryEventByMail = async (email: string) => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    const events: any = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          privateExtendedProperty: `email=${email}`,
          timeMin: new Date().toISOString(),
          maxResults: 100,
          singleEvents: true,
          orderBy: "startTime",
        },
        (err: any, events: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(events);
          }
        }
      );
    });
    return { success: true, message: "OK", data: events.data.items };
  } catch (error) {
    return JSON.stringify(
      { success: false, message: (error as Error).message },
      null,
      4
    );
  }
};
const queryEventById = async (eventId: string) => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    const event: any = await new Promise((resolve, reject) => {
      calendar.events.get(
        {
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          eventId: eventId,
        },
        (err: any, event: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(event);
          }
        }
      );
    });
    return { success: true, message: "OK", data: event.data };
  } catch (error) {
    return { success: false, message: error };
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
    const { eventId }: any = event.context.params;
    // query by email
    if (eventId.includes("@")) {
      const result = await queryEventByMail(eventId);
      return JSON.stringify(result, null, 4);
    }
    // query by eventId
    const result = await queryEventById(eventId);
    return JSON.stringify(result, null, 4);
  } catch (error) {
    return JSON.stringify(
      { success: false, message: (error as Error).message },
      null,
      4
    );
  }
});
