import { getJson } from "@/composables/useJson";
export const useInccuStore = defineStore("inccu", {
  state: () => ({
    inccu: {} as JSON,
    course: [] as JSON[],
    major: "",
    scoreOutdated: false, // 成績需要更新
    courseOutdated: false, // 課程需要更新
  }),
  getters: {
    getInccu: (state) => state.inccu,
    getCourse: (state) => state.course,
    getMajor: (state) => state.major,
    getScoreOutdated: (state) => state.scoreOutdated,
    getCourseOutdated: (state) => state.courseOutdated,
  },
  actions: {
    async fetchInccu() {
      this.inccu = await getJson();
      if ("課業學習" in this.inccu) {
        const course = this.inccu["課業學習"] as any;
        this.major = course["major1Name"];
        if ("creditDataArray" in course) {
          const year = new Date().getFullYear() - 1911;
          const month = new Date().getMonth() + 1;
          const academicYear = year - (month < 8 ? 1 : 0);
          const sem = month > 2 && month < 8 ? "2" : "1";

          const thisSemCourse = course["creditDataArray"].filter(
            (course: any) => {
              return course.YYSMT === `${academicYear} ${sem}`;
            }
          );

          this.scoreOutdated = useArrayEvery(thisSemCourse, (course: any) => {
            course.score === "成績未到或無成績";
          }).value;

          const courseList = await Promise.all(
            thisSemCourse.map((course: any) => useCourseDetail(course.subNum))
          );
          this.course = courseList;

          if (this.course.length === 0) this.courseOutdated = true;
        }
      }
    },
  },
});
