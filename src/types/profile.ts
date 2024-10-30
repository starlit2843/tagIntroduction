import { z } from "zod";

export const SHARE_URL_SIZE_LIMIT = 100;
export const SHARE_URL_LIMIT = 3;
export const TIMED_URL_LIMIT = 2;
export type FieldStatus = "good" | "bad" | "running";

export const deptSchema = z.object({
  major: z.string().default(""),
  major_year: z.string().default(""),
  double_major: z.string().default(""),
  double_major_year: z.string().default(""),
  minor_1: z.string().default(""),
  minor_1_year: z.string().default(""),
  minor_2: z.string().default(""),
  minor_2_year: z.string().default(""),
});

export const profileSchema = z.object({
  nickname: z.string().default(""), // 平台暱稱
  customize_id: z.string().default(""), // 自訂ID
  badges: z.array(z.string()).default([]), // 徽章
  bio: z.string().default(""), // 自我介紹
  share_urls: z
    .array(z.string().max(SHARE_URL_SIZE_LIMIT))
    .max(SHARE_URL_LIMIT)
    .default([]), // 分享連結
  timed_urls: z
    .array(z.string().max(SHARE_URL_SIZE_LIMIT))
    .max(TIMED_URL_LIMIT)
    .default([]), // 限時連結
  timed_urls_deadtime: z
    .array(z.number().int().nonnegative())
    .max(TIMED_URL_LIMIT)
    .default([]), // 限時連結的到期時間
});
export const avatarSchema = z.object({
  avatar: z.string().default(""),
});

export const classesSchema = z.array(z.string()).default([]);
export const inccuSchema = z.object({}).default({});

export type Dept = z.infer<typeof deptSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Avatar = z.infer<typeof avatarSchema>;
export type Classes = z.infer<typeof classesSchema>;
export type Inccu = z.infer<typeof inccuSchema>;
export type APIError = {
  type: "FIELD_ERROR" | "PROGRAM_ERROR" | "UNKNOWN";
  message: string;
};
