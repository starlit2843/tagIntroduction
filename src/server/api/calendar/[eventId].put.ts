import { authorize, checkPermission } from "~/server/api/utils/calendar";
import { google } from "googleapis";

const updateEvent = async (eventId: string, newEvent: any) => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    const updatedEvent: any = await new Promise((resolve, reject) => {
      calendar.events.update(
        {
          auth: auth,
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          eventId: eventId,
          resource: newEvent,
        },
        (err: any, updatedEvent: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(updatedEvent);
          }
        }
      );
    });
    return {
      success: true,
      message: `Event updated: ${updatedEvent.data.id}. Check it on /api/calendar/${updatedEvent.data.id}`,
    };
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
    const { eventId }: any = event.context.params;
    if (!eventId) {
      const result = { success: false, message: "bad request" };
      return JSON.stringify(result, null, 4);
    }
    const { newEvent } = await readBody(event);
    const result = await updateEvent(eventId, newEvent);
    return JSON.stringify(result, null, 4);
  } catch (error) {
    return JSON.stringify(error, null, 4);
  }
});
