interface Session {
  /** The weekday of session. */
  week_code: number;
  /** The o'clock of beginning of the session. */
  start_time: number;
  /** The o'clock of ending of the session. */
  end_time: number;
  /** The origin string. */
  origin_str: string;
}

interface ClassDataRawData {
  alteration: string;
  core: boolean;
  course_id: string;
  credit: string;
  defence: boolean;
  enrollment: string;
  general_computing: boolean;
  general_humanities: boolean;
  general_language: boolean;
  general_residential: boolean;
  general_science: boolean;
  general_social: boolean;
  instructor_id: string;
  language: "中文" | "英文" | string;
  location: string;
  name: string;
  note: string;
  pe: boolean;
  regulation: string;
  remain: number;
  semester_last: string;
  session: string;
  syllabus: string;
  time: string;
  traced: boolean;
  type: "必修" | "選修" | "群修" | string;
  unit: string;
}

import {
  getSessionArray,
  getSession,
  getEncodeSessionArray,
} from "./timeParser";

export class Class {
  protected data: ClassDataRawData = {
    alteration: "",
    core: false,
    course_id: "",
    credit: "",
    defence: false,
    enrollment: "",
    general_computing: false,
    general_humanities: false,
    general_language: false,
    general_residential: false,
    general_science: false,
    general_social: false,
    instructor_id: "",
    language: "中文",
    location: "",
    name: "",
    note: "",
    pe: false,
    regulation: "",
    remain: -1,
    semester_last: "",
    session: "",
    syllabus: "",
    time: "",
    traced: false,
    type: "必修",
    unit: "",
  };
  private sessionArray: Session[];
  private sessionString: string;
  private encodeSessionEncodeArray: number[];

  public constructor(dataRawData?: ClassDataRawData) {
    // Deep copy
    if (dataRawData) {
      this.data = JSON.parse(JSON.stringify(dataRawData)) as ClassDataRawData;
    }
    this.sessionArray = getSessionArray(this.data.session);
    this.sessionString = getSession(this.sessionArray);
    this.encodeSessionEncodeArray = getEncodeSessionArray(this.sessionArray);
  }

  public stringify() {
    return this.data;
  }

  public getSessionArray() {
    return this.sessionArray;
  }

  public getSession() {
    return this.sessionString;
  }

  public getEncodeSessionArray() {
    return this.encodeSessionEncodeArray;
  }

  public getLocation() {
    if (this.data.location === "") return "無";
    return this.data.location;
  }

  public getType() {
    return this.data.type;
  }

  public getId() {
    return this.data.course_id;
  }

  public getName() {
    return this.data.name;
  }

  public getUnit() {
    return this.data.unit;
  }

  public getCredit() {
    return this.data.credit;
  }

  public getNote() {
    return this.data.note.split("＠備註:")[1];
  }

  public getTeacher() {
    return this.data.instructor_id;
  }

  public getCourseSettingUrl() {
    return this.data.syllabus;
  }

  public getSelectSettingUrl() {
    return this.data.regulation;
  }
}
