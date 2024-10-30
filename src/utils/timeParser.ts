const LESSON_COUNT_PER_DAY = 17;

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

/**
 * @param  {string} time_str The time string of NCCU course. e.g. "一34D56", "二34四34".
 *
 * @return {Session[]} The parsed session array.
 */
export const getSessionArray = (time_str: string): Session[] => {
  if (time_str === "未定或彈性") {
    return [];
  }
  const time_char = [
    "A",
    "B",
    "1",
    "2",
    "3",
    "4",
    "C",
    "D",
    "5",
    "6",
    "7",
    "8",
    "E",
    "F",
    "G",
    "H",
  ];
  const weekday_code = ["一", "二", "三", "四", "五", "六", "日"];
  let current_weekday = 1;
  let current_start_time = 0;
  let current_end_time = 0;
  let last_time = 0;
  let recording = false;
  let res: Session[] = [];
  let key = 0;

  const get_start_time = (char: string) => {
    const time_char = [
      "A",
      "B",
      "1",
      "2",
      "3",
      "4",
      "C",
      "D",
      "5",
      "6",
      "7",
      "8",
      "E",
      "F",
      "G",
      "H",
    ];
    let index = time_char.indexOf(char);
    let time = 6;
    if (index) time += index;
    return time;
  };

  const get_end_time = (char: string) => {
    const time_char = [
      "A",
      "B",
      "1",
      "2",
      "3",
      "4",
      "C",
      "D",
      "5",
      "6",
      "7",
      "8",
      "E",
      "F",
      "G",
      "H",
    ];
    let index = time_char.indexOf(char);
    let time = 7;
    if (index) time += index;
    return time;
  };

  const push_into_res = () => {
    let tmp: Session = {
      week_code: -1,
      start_time: -1,
      end_time: -1,
      origin_str: "",
    };
    tmp.week_code = current_weekday + 1;
    tmp.start_time = get_start_time(time_char[current_start_time]);
    tmp.end_time = get_end_time(time_char[current_end_time]);
    let origin_str = weekday_code[current_weekday];
    for (let i = current_start_time; i <= current_end_time; i++) {
      origin_str += time_char[i];
    }
    tmp.origin_str = origin_str;
    res.push(tmp);
  };

  time_str.split("").forEach((char) => {
    if (weekday_code.indexOf(char) >= 0) {
      if (recording) {
        // end a phase
        push_into_res();
        recording = false;
      }
      current_weekday = weekday_code.indexOf(char);
    } else {
      if (!recording) {
        // start a phase
        current_start_time = time_char.indexOf(char);
        recording = true;
      } else if (time_char.indexOf(char) !== last_time + 1) {
        push_into_res();
        current_start_time = time_char.indexOf(char);
      }
      current_end_time = time_char.indexOf(char);
      last_time = time_char.indexOf(char);
    }
  });

  push_into_res();
  return res;
};

/**
 * @param  {Session[]} sessionArray The parsed session array.
 *
 * @return {string} The time string of NCCU course. e.g. "一34D56", "二34四34".
 */
export const getSession = (sessionArray: Session[]): string => {
  if (sessionArray.length === 0) return "未定或彈性";
  const mappingDayCode = ["一", "二", "三", "四", "五", "六", "日"];
  return sessionArray
    .map(
      (session) =>
        mappingDayCode[session.week_code - 1] +
        "/" +
        session.start_time.toString() +
        "~" +
        session.end_time.toString()
    )
    .join(", ");
};

export const getEncodeSessionArray = (sessionArray: Session[]): number[] => {
  const result: number[] = [];
  if (sessionArray.length === 0) return [];
  sessionArray.map((session) => {
    const dayCode = session.week_code - 1;
    const startTime = session.start_time;
    const endTime = session.end_time;
    for (let i = startTime; i <= endTime; i++) {
      result.push(dayCode * LESSON_COUNT_PER_DAY + i);
    }
  });
  return result;
};
