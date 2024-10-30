import fs from "fs";
import path from "path";
import process from "process";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// TODO: replace calendar_token.json path at second field
const TOKEN_PATH = path.join(
  process.cwd(),
  "/server/config/calendar_token.json"
);

// TODO: replace credentials_opennccu.json path at second field
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "/server/config/credentials_opennccu.json"
);

export const authorize = async () => {
  let client: any = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};
export const isBadgeValid = async (idToken: string) => {
  try {
    const decoded: any = await $fetch("/api/user/profile", {
      headers: { authorization: idToken },
    });
    return decoded.profile.badges
      .map((badge: string) => badge.toLowerCase())
      .includes("organization");
  } catch (err) {
    return false;
  }
};
export const checkPermission = async (headers: any) => {
  // check if there is idToken in the headers:
  if (!headers.authorization) {
    return { success: false, message: "unauthorized" };
  }
  // if JWT exist, check if a valid badge exists.
  if (!(await isBadgeValid(headers.authorization))) {
    return { success: false, message: "permission denied" };
  }
  return { success: true, message: "OK" };
};
const saveCredentials = async (client: any) => {
  const content: any = await fs.promises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.promises.writeFile(TOKEN_PATH, payload);
};
const loadSavedCredentialsIfExist = async () => {
  try {
    const content: any = await fs.promises.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};
