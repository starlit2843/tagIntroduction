import { verifyToken } from "../config/firebaseConfig";
import { searchParse2SelectCourseData } from "./parser";

export default defineEventHandler(async (event) => {
  const idToken = getRequestHeader(event, "authorization")?.split("Bearer ")[1];
  if (!idToken) throw new Error("idToken required");
  await verifyToken(idToken);

  // get courseId from request params
  const { courseId } = getQuery(event);
  if (!courseId) throw new Error("courseId required");

  // get course detail from qrysub.nccu.edu.tw
  const courseDetail = await getCourseDetail(courseId as string);
  if (!courseDetail) throw new Error("courseDetail not found");

  const mappedCourseDetail = searchParse2SelectCourseData(courseDetail);
  return mappedCourseDetail;
});

async function getCourseDetail(courseId: string) {
  const year = new Date().getFullYear() - 1911;
  const month = new Date().getMonth() + 1;
  const academicYear = year - (month < 7 ? 1 : 0);
  const sem = month > 1 && month < 8 ? "2" : "1";
  const url = `http://es.nccu.edu.tw/course/zh-TW/:sem=${academicYear}${sem} ${courseId}/`;
  const res: any = await $fetch(url);
  let courseDetail = null;
  if (res) {
    res.forEach((course: any) => {
      if (course.subNum === courseId) {
        courseDetail = course;
      }
    });
  }
  return courseDetail;
}
