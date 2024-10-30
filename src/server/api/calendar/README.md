# OpenNCCU Calendar APIs

This is the API documentation for the OpenNCCU public subscription calendar. This series of APIs utilizes the Google Calendar API, Firebase, and Google Sheets. Authorized users can read and write calendar events via the API.

Each event has a unique eventId, which is required when deleting or updating an event. The eventId and information related to the user who added the event (Opentag and email) will be stored in both Firebase and Google Sheets.

The APIs will always return a statusCode of 200, indicating that the request was successfully received and processed. However, the actual status or result of the request will be detailed in the `message` field of the response body. Please refer to the message field for information about the specific outcome of the request.

If the user does not have the **Organization** badge or has not set a **customize_id**, their request will be denied.

- [Calendar data in Google Sheets](https://docs.google.com/spreadsheets/d/1n_5lDrexY9-7AtwlN8qkEl01zS-Gx0aAZGSbylyMCEU/edit?usp=sharing)
- [Google Calendar events fields](https://developers.google.com/calendar/api/v3/reference/events?hl=zh-tw)
- [dateTime format - RFC3339](https://datatracker.ietf.org/doc/html/rfc3339)

## Get calendar events

These two APIs allow you to read events from the calendar. If you provide an eventId, you can retrieve the data for a specific event.

If the eventId contains @, such as `ty80517@gmail.com`, it will return all events added by this email.

### Endpoints

    - /api/calendar
    - /api/calendar/${eventId}

### Request

- **Method:** `GET`
- **URL:**
  - `/api/calendar`
  - `/api/calendar/${eventId}`
- **Headers:**
  - `Authorization: Bearer <idToken>`

### Path Parameters

- `eventId` (string): The unique identifier of the event to retrieve.

### Response

- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Response Body:**

```json
{
  "success": true,
  "message": "OK",
  "data": {
    "kind": "calendar#event",
    "etag": "\"3450877725720000\"",
    "id": "bkev1g6s0hqhbcimirdesk3608",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=YmtldjFnNnMwaHFoYmNpbWlyZGVzazM2MDggNmM3MWJhNmRkMjA0ZDgyM2IzNmVlZWVkNzNjZDgzYjk4OTg5MDliN2RjOGU5YjI5OGQ0MDlmZGViOGE4MTkyYUBn",
    "created": "2024-09-04T08:34:22.000Z",
    "updated": "2024-09-04T08:34:22.860Z",
    "summary": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "description": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "location": "國立台灣大學",
    "creator": {
      "email": "ty80517@gmail.com"
    },
    "organizer": {
      "email": "6c71ba6dd204d823b36eeeed73cd83b9898909b7dc8e9b298d409fdeb8a8192a@group.calendar.google.com",
      "displayName": "政大學生共編行事曆",
      "self": true
    },
    "start": {
      "date": "2024-09-18"
    },
    "end": {
      "date": "2024-09-18"
    },
    "iCalUID": "bkev1g6s0hqhbcimirdesk3608@google.com",
    "sequence": 0,
    "reminders": {
      "useDefault": false
    },
    "eventType": "default"
  }
}
```

## Create calendar event

This API allows authorized users to add events. The detailed information about the event should be included in the POST body. The POST body must include `summary`, `start`, and `end`, while `location` and `description` is optional. For detailed fields that can be included, please refer to the [Google Calendar events fields](https://developers.google.com/calendar/api/v3/reference/events?hl=zh-tw).

The `start` and `end` fields must contain either `date` or `dateTime`. The difference is that `date` represents an all-day event without time information, while `dateTime` includes time information.

The event data in the POST body must be placed within an object named `newEvent`.

### Endpoints

    - /api/calendar
    - /api/calendar/${eventId}

### Request

- **Method:** `POST`
- **URL:**
  - `/api/calendar`
- **Headers:**
  - `Authorization: Bearer <idToken>`
- **Body:**

```json
{
  "newEvent": {
    "summary": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "location": "國立政治大學",
    "description": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "start": {
      "dateTime": "2024-09-20T18:00:00"
    },
    "end": {
      "dateTime": "2024-09-20T19:00:00"
    }
  }
}
```

### Response

- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Response Body:**

```json
{
  "success": true,
  "message": "Event created: ╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司 (urr6nt2ijrfu8kjntdvja0hgd8)",
  "data": {
    "id": "urr6nt2ijrfu8kjntdvja0hgd8",
    "summary": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "location": "國立台灣大學",
    "description": "╰(⊙Д⊙)╮佛心公司╭(⊙Д⊙)╯佛心公司",
    "start": {
      "dateTime": "2024-09-20T18:00:00+08:00",
      "timeZone": "Asia/Taipei"
    },
    "end": {
      "dateTime": "2024-09-20T19:00:00+08:00",
      "timeZone": "Asia/Taipei"
    },
    "htmlLink": "https://www.google.com/calendar/event?eid=dXJyNm50MmlqcmZ1OGtqbnRkdmphMGhnZDggNmM3MWJhNmRkMjA0ZDgyM2IzNmVlZWVkNzNjZDgzYjk4OTg5MDliN2RjOGU5YjI5OGQ0MDlmZGViOGE4MTkyYUBn",
    "created": "2024-09-04T09:22:10.000Z"
  }
}
```

## Update calendar events

Put the `eventId` in the URL, and the information to be updated should be placed in the PUT body. It's not necessary to include the entire event in the PUT body. only the information that needs to be updated should be included.

The event data in the PUT body must be placed within an object named `newEvent`.

### Endpoints

    - /api/calendar/${eventId}

### Request

- **Method:** `PUT`
- **URL:**
  - `/api/calendar/${eventId}`
- **Headers:**
  - `Authorization: Bearer <idToken>`

### Path Parameters

- `eventId` (string): The unique identifier of the event to retrieve.

### Response

```json
{
  "success": true,
  "message": "Event updated: bkev1g6s0hqhbcimirdesk3608. Check it on /api/calendar/bkev1g6s0hqhbcimirdesk3608"
}
```

## Delete calendar events

Place the `eventId` you want to delete in the URL.

### Endpoints

    - /api/calendar/${eventId}

### Request

- **Method:** `DELETE`
- **URL:**
  - `/api/calendar/${eventId}`
- **Headers:**
  - `Authorization: Bearer <idToken>`

### Path Parameters

- `eventId` (string): The unique identifier of the event to retrieve.

### Response

```json
{
  "success": true,
  "message": "Event deleted: ot3utke9pdcr1iisg8mb0ooqro"
}
```
