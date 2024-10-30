import admin from "firebase-admin";
import { adminFirestore, verifyToken } from "../config/firebaseConfig";
import { z } from "h3-zod";
import { verifyTokenMiddleware } from "../utils/verifier";

const deleteKey = (obj: any, key: string) => {
  if (key in obj) {
    delete obj[key];
  }
};

const iNCCUKeys = [
  "基本資料",
  "學籍歷程",
  "課業學習",
  "能力展現",
  "健康常識",
  "多元生活",
  "心靈互動",
  "榮譽服務",
  "修課計畫 所有明細",
];

const checkBaseData = (obj: any) => {
  try {
    const schema = z.object({
      STUDENT_TUT_TEA: z.string(),
      STUDENT_NAME: z.string(),
      STUDENT_NUMBER: z.string(),
      STUDENT_GRADE_NUMBER: z.string(),
      STUDENT_GRADE_NAME: z.string(),
      STUDENT_IDENTITY: z.string(),
      STUDENT_IDENTITY2: z.string(),
      STUDENT_STUDY_IDENTITY: z.string(),
      STUDENT_BIRTHDAY: z.string(),
      STUDENT_SEX: z.string(),
      STUDENT_GUARDIAN: z.string(),
      STUDENT_EMERGENCY: z.string(),
      STUDENT_COMM_ADDRESS: z.string(),
      STUDENT_COMM_TEL: z.string(),
      STUDENT_ADDRESS: z.string(),
      STUDENT_TEL: z.string(),
      STUDENT_PRE_SCH: z.string(),
      STUDENT_MB_TEL: z.string(),
      STUDENT_INTER_SKILL: z.string(),
      STUDENT_ABORIGINES: z.string(),
      STUDENT_DISABLED: z.string(),
      STUDENT_CAR_NO: z.string(),
      STUDENT_MOTOR_NO: z.string(),
      BANK_DATA: z.array(z.string()).optional(),
      STUDENT_FEE_REDUCE: z.array(z.string()).optional(),
      STUDENT_MILITARY_STATUS: z.array(z.string()),
      STUDENT_PIC_DIR: z.string(),
      STUDENT_ADD_MJR: z.string(),
      STUDENT_ADD_MJR2: z.string(),
      STUDENT_ADD_MJR3: z.string(),
      adrTpe: z.number(),
      STUDENT_FRIEND_NAME: z.string(),
      STUDENT_FRIEND_TEL: z.string(),
      email_1: z.string(),
      email_2: z.string().optional(),
      STUDENT_ENG_NAME: z.string(),
      STUDENT_SDIV_REM: z.string(),
      STUDENT_SDIV_GRP: z.string(),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkStudentHistory = (obj: any) => {
  try {
    const schema = z.object({
      registerHistoryDataArray: z.array(
        z.object({
          year: z.string(),
          semester: z.string(),
          regsts: z.string(),
          gradename: z.string(),
          subNum: z.string(),
          score: z.string(),
          over31: z.string(),
          rem: z.string(),
        })
      ),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkCourseHistory = (obj: any) => {
  try {
    const schema = z.object({
      major1Name: z.string(),
      major2Name: z.string().optional(),
      replaceCreditDataArray: z.array(z.any()),
      tcstuwarDataArray: z.array(z.any()),
      tsodrrDataArray: z.array(
        z.object({
          SCH_YEAR: z.string(),
          SCH_SMT: z.string(),
          POINTS: z.number(),
          UAVG: z.string(),
          AVGPNT: z.string(),
          AVGAVG: z.string(),
          UODR: z.string(),
          SDEPODR: z.string(),
        })
      ),
      trrejstuDataArray: z.array(z.any()),
      trstunatDataArray: z.array(z.any()),
      creditDataArray: z.array(
        z.object({
          year: z.string(),
          semester: z.string(),
          regsts: z.string(),
          gradename: z.string(),
          subNum: z.string(),
          subName: z.string(),
          subSel: z.string(),
          subPnt: z.string(),
          score: z.string(),
          over31: z.string(),
          rem: z.string(),
          YYSMT: z.string(),
          SHOWTCRES: z.string().optional(),
        })
      ),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkAbility = (obj: any) => {
  try {
    const schema = z.object({
      partTimeJobDataArray: z.array(z.any()),
      qualificationsVerifiedDataArray: z.array(z.any()),
      skillTrainDataArray: z.array(z.any()),
      computerStudyDataArray: z.array(z.any()),
      studentLicenceDataArray: z.array(z.any()),
      studentEngcertfDataArray: z.array(z.any()),
      englishStudyDataArray: z.array(z.any()),
      studentAboriginalDataArray: z.array(z.any()),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkHealth = (obj: any) => {
  try {
    const schema = z.object({
      outpatientServicesRecordArray: z.array(z.any()),
      healthKnowledgeDataArray: z.array(z.any()),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkLife = (obj: any) => {
  try {
    const schema = z.object({
      STUDENT_DORM_DATA: z.array(z.any()),
      STUDENT_DORM_DATA2: z.array(
        z.object({
          SCHOOL_YEAR: z.string(),
          SCHOOL_SMT: z.string(),
          DORM_NAME: z.string(),
          DORM_NUM: z.string(),
          ROOM_NAME: z.string(),
          ROOM_FRIEND: z.array(z.string()),
          SUMCHI: z.string(),
        })
      ),
      STUDENT_WORK: z.array(z.any()),
      artAndLiteratureDataArray: z.array(z.any()),
      speechAndDiscussionDataArray: z.array(
        z.object({
          courseName: z.string(),
          unit: z.string(),
          hour: z.string(),
          date: z.string(),
        })
      ),
      alStuGroup: z
        .array(
          z.object({
            PosNam: z.string(),
            SchSmt: z.string(),
            SchYy: z.string(),
            SgrpNam: z.string(),
          })
        )
        .optional(),
      dorSRVList: z.array(z.any()),
      MaactDataArray: z.array(z.any()),
      MhdorrpsDataArray: z.array(z.any()),
      lifeExperienceDataArray: z.array(z.any()),
      introAccountDataArray: z.array(z.any()),
      othersLearningDataArray: z.array(z.any()),
      MpactDataArray: z.array(z.any()),
      MpfiredrillDataArray: z.array(
        z.object({
          SCH_YEAR: z.string(),
          ACT_CHI: z.string(),
          DATE: z.string(),
          TOTALPNT: z.number(),
        })
      ),
      MpheroDataArray: z.array(
        z.object({
          SCH_YEAR: z.string(),
          SCH_SMT: z.string(),
          TPE_CHI1: z.string(),
          TPE_CHI2: z.string(),
          CREDIT: z.string(),
          REMARK: z.string(),
          TOTALPNT: z.number(),
        })
      ),
      CREDIT: z.number(),
    });

    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkCommunity = (obj: any) => {
  try {
    const schema = z.object({
      tutorTeacherList: z.array(
        z.object({
          schoolYear: z.string(),
          semester: z.string(),
          officeNumber: z.string(),
          officeTel: z.string(),
          email: z.string(),
          teacherName: z.string(),
        })
      ),
      guidanceAndAssistanceDataArray: z.array(z.any()),
      mildBecomeMatureDataArray: z.array(z.any()),
      dpSRVList: z.array(
        z.object({
          schoolYear: z.string(),
          semester: z.string(),
          officeNumber: z.string(),
          officeTel: z.string(),
          email: z.string(),
          teacherName: z.string(),
        })
      ),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkService = (obj: any) => {
  try {
    const schema = z.object({
      scholarshipArray: z.array(z.any()),
      rewardDataArray: z.array(z.any()),
      conductDataArray: z.array(
        z.object({
          schoolYear: z.string(),
          semester: z.string(),
          stunum: z.string(),
          totgrd: z.number(),
        })
      ),
      mawrdDataArray: z.array(z.any()),
      competitionRecordDataArray: z.array(z.any()),
      priorityValDataArray: z.array(z.any()),
      priorityCorDataArray: z.array(z.any()),
      priorityVotDataArray: z.array(z.any()),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

const checkCourse = (obj: any) => {
  try {
    const schema = z.object({
      目前校定必修修習狀況摘要: z.array(
        z.object({
          getRemark: z.string(),
        })
      ),
      通識: z.array(
        z.object({
          getSemester: z.string(),
          getScostr: z.string(),
          getRemark: z.string(),
          getSubchi: z.string(),
          getKind: z.string(),
          getSubpnt2: z.string(),
          getSubnum: z.string(),
        })
      ),
      體育: z.array(
        z.object({
          getSemester: z.string(),
          getScostr: z.string(),
          getSubchi: z.string(),
          getSubpnt2: z.string(),
          getSubnum: z.string(),
        })
      ),
      目前系必修修習狀況摘要: z
        .array(
          z.object({
            getVettpe: z.string(),
            getSemester: z.string(),
            getPoints: z.string(),
          })
        )
        .optional(),
      群修修習狀況摘要: z
        .array(
          z.object({
            getRemark: z.string(),
          })
        )
        .optional(),
      已修習之專業必修科目明細: z.array(
        z.object({
          getSemester: z.string(),
          getScostr: z.string(),
          getSubchi: z.string(),
          getSubpnt2: z.string(),
          getSubnum: z.string(),
        })
      ),
      選修明細: z.array(
        z.object({
          getSemester: z.string(),
          getScostr: z.string(),
          getSubchi: z.string(),
          getSubpnt2: z.string(),
          getSubnum: z.string(),
        })
      ),
    });
    schema.parse(obj);
    return true;
  } catch (error) {
    let message = "unknown error";
    if (error instanceof z.ZodError) {
      message = error.toString();
    }
    console.log(message);
    return false;
  }
};

export default defineEventHandler(async (event) => {
  try {
    const uid = await verifyTokenMiddleware(event);

    const { data } = await readBody(event);

    const originJsonStr = JSON.stringify(data).replace(/ {2,}/g, "");
    const originalJson = JSON.parse(originJsonStr);
    const iNCCUData = {} as any;
    originalJson.forEach((item: any) => {
      const itemKey = Object.keys(item)[0];
      if (iNCCUKeys.includes(itemKey)) {
        deleteKey(item[itemKey], "alWebList");
        deleteKey(item[itemKey], "url_104");

        switch (itemKey) {
          case "基本資料":
            if (!checkBaseData(item[itemKey])) {
              throw new Error("基本資料欄位有誤");
            }
            break;
          case "學籍歷程":
            if (!checkStudentHistory(item[itemKey])) {
              throw new Error("學籍歷程欄位有誤");
            }
            item[itemKey] = item[itemKey]["registerHistoryDataArray"];
            break;
          case "課業學習":
            if (!checkCourseHistory(item[itemKey])) {
              throw new Error("課業學習欄位有誤");
            }
            break;
          case "能力展現":
            if (!checkAbility(item[itemKey])) {
              throw new Error("能力展現欄位有誤");
            }
            break;
          case "健康常識":
            if (!checkHealth(item[itemKey])) {
              throw new Error("健康常識欄位有誤");
            }
            break;
          case "多元生活":
            if (!checkLife(item[itemKey])) {
              throw new Error("多元生活欄位有誤");
            }
            break;
          case "心靈互動":
            if (!checkCommunity(item[itemKey])) {
              throw new Error("心靈互動欄位有誤");
            }
            break;
          case "榮譽服務":
            if (!checkService(item[itemKey])) {
              throw new Error("榮譽服務欄位有誤");
            }
            break;
          case "修課計畫 所有明細":
            if (item[itemKey].length === 0) {
              return;
            }
            const keys = [
              "目前校定必修修習狀況摘要",
              "通識",
              "體育",
              "目前系必修修習狀況摘要",
              "群修修習狀況摘要",
              "已修習之專業必修科目明細",
              "選修明細",
            ];
            const courseData = {} as any;
            item[itemKey].forEach((_item: any) => {
              const _itemKey = Object.keys(_item)[0];
              if (keys.includes(_itemKey)) {
                courseData[_itemKey] = _item[_itemKey];
                if (_itemKey === "體育") {
                  _item[_itemKey] = _item[_itemKey].filter(
                    (item: any) => item.getSemester !== "null/null"
                  );
                }
                courseData[_itemKey] = _item[_itemKey];
              }
            });
            item[itemKey] = courseData;
            if (!checkCourse(item[itemKey])) {
              throw new Error("修課計畫欄位有誤");
            }
            break;
        }
        iNCCUData[itemKey] = item[itemKey];
      }
    });

    adminFirestore
      .collection("inccu")
      .doc(uid)
      .set({
        ...iNCCUData,
        lastUpdate: admin.firestore.FieldValue.serverTimestamp(),
        originData: data,
      });
    return iNCCUData;
  } catch (error: any) {
    sendError(event, error, process.env.NODE_ENV === "development");
  }
});
