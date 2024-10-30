const commonMapKeys = {
  subNum: "course_id",
  subNam: "name",
  langTpe: "language",
  smtQty: "semester_last",
  subSetUrl: "enrollment",
  teaSchmUrl: "syllabus",
  subClassroom: "location",
  teaNam: "instructor_id",
  subTime: "session",
  subPoint: "credit",
  subKind: "type",
  subGde: "unit",
  note: "note",
  info: "alteration",
  subUnitRuleUrl: "regulation",
};

export const searchParse2SelectCourseData = (rawData: any, locale?: string) => {
  let newData: { [key: string]: any } = {
    course_id: "",
    name: "",
    unit: "",
    credit: "",
    instructor_id: "",
    session: "",
    note: null,
    alteration: null,
    remain: 0,
    location: "",
    type: "",
    language: "",
    enrollment: "",
    syllabus: "",
    regulation: "",
    general_residential: false,
    general_language: null as any,
    general_humanities: false,
    general_social: false,
    general_computing: false,
    general_science: false,
    core: false,
    pe: false,
    defence: false,
    time: "",
    semester_last: "",
  };
  if (rawData === null) {
    return newData;
  }
  Object.entries(commonMapKeys).forEach(([key, newKey]) => {
    newData[newKey] = rawData[key];
  });
  //newData["time"] = session2time(newData["session"]);
  newData["traced"] = false;
  newData["general_residential"] =
    rawData["lmtKind"] === "書院通識" ||
    rawData["lmtKind"] === "Residential College General Education";
  newData["general_language"] = rawData["lmtKind"]
    ? rawData["lmtKind"] === "外文通識" ||
      rawData["lmtKind"] === "中文通識" ||
      rawData["lmtKind"] === "General Course/Chinese"
    : null;
  newData["general_humanities"] =
    rawData["lmtKind"] === "人文通識" ||
    rawData["lmtKind"] === "General Course/Humanities" ||
    (rawData["lmtKind"].includes("人文") &&
      rawData["lmtKind"].includes("跨領域"));
  newData["general_social"] =
    rawData["lmtKind"] === "社會通識" ||
    rawData["lmtKind"] === "General Course/Social Sciences" ||
    (rawData["lmtKind"].includes("社會") &&
      rawData["lmtKind"].includes("跨領域"));
  newData["general_computing"] =
    rawData["lmtKind"] === "資訊通識" ||
    rawData["lmtKind"] === "General Course/Informatics and Computing" ||
    (rawData["lmtKind"].includes("資訊") &&
      rawData["lmtKind"].includes("跨領域"));
  newData["general_science"] =
    rawData["lmtKind"] === "自然通識" ||
    rawData["lmtKind"] === "General Course/Natural Sciences" ||
    (rawData["lmtKind"].includes("自然") &&
      rawData["lmtKind"].includes("跨領域"));
  newData["core"] = rawData["core"] === "是" || rawData["core"] === "Yes";
  newData["pe"] =
    (rawData["subGde"] === "體育" && rawData["subKind"] === "必修") ||
    (rawData["subGde"] === "Physical Education Office" &&
      rawData["subKind"] === "Required");
  newData["defence"] =
    rawData["subGde"] === "軍訓" ||
    rawData["subGde"] === "Military Education Office";
  if (
    rawData["lmtKind"].includes("通識") ||
    rawData["lmtKind"].includes("跨領域") ||
    rawData["lmtKind"].includes("General Course") ||
    rawData["lmtKind"].includes("General Education") ||
    rawData["lmtKind"].includes("Cross-Discipline")
  ) {
    newData["type"] = locale === "en" ? "General Course" : "通識";
  }
  if (newData["pe"]) {
    newData["location"] = newData["note"].split("上課地點：")[1] || "";
  }
  return newData;
};
