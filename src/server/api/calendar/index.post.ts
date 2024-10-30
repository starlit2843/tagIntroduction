import { authorize, checkPermission } from "~/server/api/utils/calendar";
import { getUserDataByIdToken } from "~/server/api/utils/getUserDataByIdToken";
import { google } from "googleapis";

interface EventPrivateProperties {
  email: string;
  displayName: string;
  opentag: string;
}
interface EventExtendedProperties {
  private?: EventPrivateProperties;
}
interface EventDateTime {
  date?: string; // only date. e.g. 2024-09-01
  dateTime?: string; // date and time.
  timeZone: string;
}
interface EventData {
  id?: string; // only receive id when the event is added to Google Calendar.
  summary: string; // will show on calendar title
  location?: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
  htmlLink?: string;
  created: string;
  extendedProperties: EventExtendedProperties;
}

const insertEvent = async (newEvent: any) => {
  try {
    const auth: any = await authorize();
    const calendar: any = google.calendar({ version: "v3", auth });
    const savedEvent: any = await new Promise((resolve, reject) => {
      calendar.events.insert(
        {
          auth: auth,
          calendarId:
            "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
          resource: newEvent,
        },
        (err: any, savedEvent: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(savedEvent);
          }
        }
      );
    });
    const {
      id,
      summary,
      location,
      description,
      start,
      end,
      htmlLink,
      created,
    }: EventData = savedEvent.data;
    return {
      success: true,
      message: `Event created: ${summary} (${id})`,
      data: {
        id,
        summary,
        location,
        description,
        start,
        end,
        htmlLink,
        created,
      },
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
    const { newEvent } = await readBody(event);
    const { userData, userProfile } = (await getUserDataByIdToken(headers))
      .data;
    if (!userProfile.customize_id) {
      const result = {
        success: false,
        message: "permission denied (must set customize_id to use)",
      };
      return JSON.stringify(result, null, 4);
    }
    // start and end is required
    // date or datetime cannot appear at the same time.
    if (
      !newEvent ||
      !newEvent.summary ||
      !newEvent.start ||
      !newEvent.end ||
      (newEvent.start.date && newEvent.start.datetime) ||
      (newEvent.end.date && newEvent.end.datetime)
    ) {
      const result = { success: false, message: "bad request" };
      return JSON.stringify(result, null, 4);
    }
    if (!newEvent.start.timeZone) {
      newEvent.start.timeZone = "Asia/Taipei";
    }
    if (!newEvent.end.timeZone) {
      newEvent.end.timeZone = "Asia/Taipei";
    }
    newEvent.extendedProperties = {};
    newEvent.extendedProperties.private = {};
    newEvent.extendedProperties.private.email = userData.email;
    newEvent.extendedProperties.private.displayName = userData.name;
    newEvent.extendedProperties.private.opentag = userProfile.customize_id;
    const result = await insertEvent(newEvent);
    return JSON.stringify(result, null, 4);
  } catch (error) {
    const result = { success: false, message: (error as Error).message };
    return JSON.stringify(result, null, 4);
  }
});
