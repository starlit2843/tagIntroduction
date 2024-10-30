interface CourseData {
  yearSemester: string;
  subName: string;
  score: string;
  courseSubPnt: number;
}

interface Gpa {
  gpa: string;
  courseGpaList: string[];
}

interface GpaData {
  subPnt: number;
  courseDataList: CourseData[];
  gpa_43: Gpa;
  gpa_4: Gpa;
  gpa_5: Gpa;
  gpa_100: Gpa;
}

export const useGpaStore = defineStore("gpa", {
  state: () => ({
    overallGpa: {
      subPnt: 0.0,
      courseDataList: [] as CourseData[],
      gpa_43: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_4: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_5: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_100: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
    } as GpaData,

    last60Gpa: {
      subPnt: 0.0,
      courseDataList: [] as CourseData[],
      gpa_43: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_4: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_5: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_100: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
    } as GpaData,

    last2YearGpa: {
      subPnt: 0.0,
      courseDataList: [] as CourseData[],
      gpa_43: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_4: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_5: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
      gpa_100: {
        gpa: "" as string,
        courseGpaList: [] as string[],
      },
    } as GpaData,

    loading: false as boolean,
  }),
  getters: {
    getOverallGpa: (state) => state.overallGpa,
    getLast60Gpa: (state) => state.last60Gpa,
    getLast2YearGpa: (state) => state.last2YearGpa,
  },
  actions: {
    async fetchOverallGpa(data: JSON) {
      const fetch43AndCourseData = async () => {
        await $fetch("/api/gpa/defaultOverall", {
          method: "POST",
          body: data,
        })
          .then((res: any) => {
            this.overallGpa.gpa_43.gpa = res.data.OverallGPA;
            this.overallGpa.subPnt = 0;
            let courseDataList: Array<CourseData> = [];
            let courseGpaList: Array<string> = [];
            for (const semester in res.data.semesterGPAs) {
              this.overallGpa.subPnt += parseFloat(
                res.data.semesterGPAs[semester].semesterSubPnt
              );
              for (const course in res.data.semesterGPAs[semester].courseGPAs) {
                const path = res.data.semesterGPAs[semester].courseGPAs[course];
                const courseData: CourseData = {
                  yearSemester: path.yearSemester,
                  subName: path.subName,
                  score: path.score,
                  courseSubPnt: path.courseSubPnt,
                };
                courseDataList.push(courseData);
                courseGpaList.push(path.courseGPA);
              }
              this.overallGpa.courseDataList = courseDataList;
              this.overallGpa.gpa_43.courseGpaList = courseGpaList;
            }
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch4 = async () => {
        await $fetch("/api/gpa/_4", { method: "POST", body: data })
          .then((res: any) => {
            this.overallGpa.gpa_4.gpa = res.data.OverallGPA;
            let courseGpaList: Array<string> = [];
            for (const semester in res.data.semesterGPAs) {
              for (const course in res.data.semesterGPAs[semester].courseGPAs) {
                const path = res.data.semesterGPAs[semester].courseGPAs[course];
                courseGpaList.push(path.courseGPA);
              }
              this.overallGpa.gpa_4.courseGpaList = courseGpaList;
            }
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch5 = async () => {
        await $fetch("/api/gpa/_5", { method: "POST", body: data })
          .then((res: any) => {
            this.overallGpa.gpa_5.gpa = res.data.OverallGPA;
            let courseGpaList: Array<string> = [];
            for (const semester in res.data.semesterGPAs) {
              for (const course in res.data.semesterGPAs[semester].courseGPAs) {
                const path = res.data.semesterGPAs[semester].courseGPAs[course];
                courseGpaList.push(path.courseGPA);
              }
              this.overallGpa.gpa_5.courseGpaList = courseGpaList;
            }
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch100 = async () => {
        await $fetch("/api/gpa/_100", { method: "POST", body: data })
          .then((res: any) => {
            this.overallGpa.gpa_100.gpa = res.data.OverallGPA;
            let courseGpaList: Array<string> = [];
            for (const semester in res.data.semesterGPAs) {
              for (const course in res.data.semesterGPAs[semester].courseGPAs) {
                const path = res.data.semesterGPAs[semester].courseGPAs[course];
                courseGpaList.push(path.courseGPA);
              }
              this.overallGpa.gpa_100.courseGpaList = courseGpaList;
            }
          })
          .catch((error) => {
            throw error;
          });
      };

      fetch43AndCourseData();
      fetch4();
      fetch5();
      fetch100();
    },

    async fetchLast60Gpa(data: JSON) {
      const fetch43AndCourseData = async () => {
        await $fetch("/api/gpa/last60", { method: "POST", body: data })
          .then((res: any) => {
            this.last60Gpa.gpa_43.gpa = res.data.Last60GPA;
            this.last60Gpa.subPnt = 0;
            let courseDataList: Array<CourseData> = [];
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              this.last60Gpa.subPnt += parseFloat(path.courseSubPnt);
              const courseData: CourseData = {
                yearSemester: path.yearSemester,
                subName: path.subName,
                score: path.score,
                courseSubPnt: path.courseSubPnt,
              };
              courseDataList.push(courseData);
              courseGpaList.push(path.courseGPA);
            }
            this.last60Gpa.courseDataList = courseDataList;
            this.last60Gpa.gpa_43.courseGpaList = courseGpaList;
          })
          .catch((error: Error) => {
            // throw error;
            console.log(error.message);
          });
      };

      const fetch4 = async () => {
        await $fetch("/api/gpa/last60_4", { method: "POST", body: data })
          .then((res: any) => {
            this.last60Gpa.gpa_4.gpa = res.data.Last60GPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last60Gpa.gpa_4.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch5 = async () => {
        await $fetch("/api/gpa/last60_5", { method: "POST", body: data })
          .then((res: any) => {
            this.last60Gpa.gpa_5.gpa = res.data.Last60GPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last60Gpa.gpa_5.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch100 = async () => {
        await $fetch("/api/gpa/last60_100", {
          method: "POST",
          body: data,
        })
          .then((res: any) => {
            this.last60Gpa.gpa_100.gpa = res.data.Last60GPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last60Gpa.gpa_100.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      fetch43AndCourseData();
      fetch4();
      fetch5();
      fetch100();
    },

    async fetchLast2YearGpa(data: JSON) {
      const fetch43AndCourseData = async () => {
        await $fetch("/api/gpa/last2year", { method: "POST", body: data })
          .then((res: any) => {
            this.last2YearGpa.gpa_43.gpa = res.data.Last2YearGPA;
            this.last2YearGpa.subPnt = 0;
            let courseDataList: Array<CourseData> = [];
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              this.last2YearGpa.subPnt += parseFloat(path.courseSubPnt);
              const courseData: CourseData = {
                yearSemester: path.yearSemester,
                subName: path.subName,
                score: path.score,
                courseSubPnt: path.courseSubPnt,
              };
              courseDataList.push(courseData);
              courseGpaList.push(path.courseGPA);
            }
            this.last2YearGpa.courseDataList = courseDataList;
            this.last2YearGpa.gpa_43.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch4 = async () => {
        await $fetch("/api/gpa/last2year_4", {
          method: "POST",
          body: data,
        })
          .then((res: any) => {
            this.last2YearGpa.gpa_4.gpa = res.data.Last2YearGPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last2YearGpa.gpa_4.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch5 = async () => {
        await $fetch("/api/gpa/last2year_5", {
          method: "POST",
          body: data,
        })
          .then((res: any) => {
            this.last2YearGpa.gpa_5.gpa = res.data.Last2YearGPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last2YearGpa.gpa_5.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      const fetch100 = async () => {
        await $fetch("/api/gpa/last2year_100", {
          method: "POST",
          body: data,
        })
          .then((res: any) => {
            this.last2YearGpa.gpa_100.gpa = res.data.Last2YearGPA;
            let courseGpaList: Array<string> = [];
            for (const course in res.data.courseGPAs) {
              const path = res.data.courseGPAs[course];
              courseGpaList.push(path.courseGPA);
            }
            this.last2YearGpa.gpa_100.courseGpaList = courseGpaList;
          })
          .catch((error) => {
            throw error;
          });
      };

      fetch43AndCourseData();
      fetch4();
      fetch5();
      fetch100();
    },

    async dataUpdated(data: JSON) {
      this.loading = true;
      await this.fetchOverallGpa(data);
      await this.fetchLast60Gpa(data);
      await this.fetchLast2YearGpa(data);
      this.loading = false;
    },
  },
});
