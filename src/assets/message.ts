const majors: Majors = {
  文學院: {
    id: 100,
    short: "文學院",
    dept: [
      {
        id: 101,
        name: "中國文學系",
        short: "中文系",
        identity: ["學", "碩", "博"],
      },
      {
        id: 103,
        name: "歷史學系",
        short: "歷史系",
        identity: ["學", "碩", "博"],
      },
      {
        id: 104,
        name: "哲學系",
        short: "哲學系",
        identity: ["學", "碩", "博"],
      },
    ],
  },
  社會科學學院: {
    id: "200",
    short: "社科院",
    dept: [
      {
        id: "202",
        name: "政治學系",
        short: "政治系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "204",
        name: "社會學系",
        short: "社會系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "205",
        name: "財政學系",
        short: "財政系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "206",
        name: "公共行政學系",
        short: "公行系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "207",
        name: "地政學系",
        short: "地政系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "208",
        name: "經濟學系",
        short: "經濟系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "209",
        name: "民族學系",
        short: "民族系",
        identity: ["學", "碩", "博"],
      },
    ],
  },
  商學院: {
    id: "300",
    short: "商學院",
    dept: [
      {
        id: "301",
        name: "國際經營與貿易學系",
        short: "國貿系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "302",
        name: "金融學系",
        short: "金融系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "303",
        name: "會計學系",
        short: "會計系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "304",
        name: "統計學系",
        short: "統計系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "305",
        name: "企業管理學系",
        short: "企管系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "306",
        name: "資訊管理學系",
        short: "資管系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "307",
        name: "財務管理學系",
        short: "財管系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "308",
        name: "風險管理與保險學系",
        short: "風管系",
        identity: ["學", "碩", "博"],
      },
    ],
  },
  傳播學院: {
    id: "400",
    short: "傳播學",
    dept: [
      {
        id: "400",
        name: "傳播學院",
        short: "傳播學",
        identity: ["學"],
      },
      {
        id: "401",
        name: "新聞學系",
        short: "新聞系",
        identity: ["學"],
      },
      {
        id: "402",
        name: "廣告學系",
        short: "廣告系",
        identity: ["學"],
      },
      {
        id: "403",
        name: "廣播電視學系",
        short: "廣電系",
        identity: ["學"],
      },
      {
        id: "405",
        name: "傳播學院大一大二不分系",
        short: "傳院不分系",
        identity: ["學"],
      },
    ],
  },
  外國語文學院: {
    id: "500",
    short: "外國語",
    dept: [
      {
        id: "500",
        name: "外國語文學院",
        short: "外國語",
        identity: ["學"],
      },
      {
        id: "501",
        name: "英國語文學系",
        short: "英文系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "502",
        name: "阿拉伯語文學系",
        short: "阿文系",
        identity: ["學"],
      },
      {
        id: "504",
        name: "斯拉夫語文學系",
        short: "斯語系",
        identity: ["學", "碩"],
      },
      {
        id: "506",
        name: "日本語文學系",
        short: "日文系",
        identity: ["學", "碩"],
      },
      {
        id: "507",
        name: "韓國語文學系",
        short: "韓文系",
        identity: ["學", "碩"],
      },
      {
        id: "508",
        name: "土耳其語文學系",
        short: "土文系",
        identity: ["學"],
      },
      {
        id: "509",
        name: "歐洲語文學系",
        short: "歐文學系",
        identity: ["學"],
      },
      {
        id: "510",
        name: "東南亞語言與文化學士學位學程",
        short: "東南亞學程",
        identity: ["學"],
      },
      // {
      //   id: "5T1",
      //   name: "外文中心",
      //   short: "外文中",
      //   identity: ["學"],
      // }
    ],
  },
  法學院: {
    id: "600",
    short: "法學院",
    dept: [
      {
        id: "601",
        name: "法律學系",
        short: "法律系",
        identity: ["學", "碩", "博"],
      },
    ],
  },
  理學院: {
    id: "700",
    short: "理學院",
    dept: [
      {
        id: "701",
        name: "應數系",
        short: "應數系",
        identity: ["學"],
      },
      {
        id: "702",
        name: "心理系",
        short: "心理系",
        identity: ["學"],
      },
      {
        id: "782",
        name: "電子物理學士學位學程",
        short: "電物學士學程",
        identity: ["學"],
      },
    ],
  },
  國際事務學院: {
    short: "國務院",
    dept: [
      {
        id: "203",
        name: "外交學系",
        short: "外交系",
        identity: ["學", "碩", "博"],
      },
    ],
  },
  教育學院: {
    short: "教育學",
    dept: [
      // {
      //   id: "900",
      //   name: "教育學院",
      //   short: "教育學",
      //   identity: ["學"],
      // },
      {
        id: "152",
        name: "教育學系",
        short: "教育系",
        identity: ["學", "碩", "博"],
      },
      // {
      //   id: "1T3",
      //   name: "師資培育中心",
      //   short: "師培中",
      //   identity: ["學"],
      // },
    ],
  },
  創新國際學院: {
    short: "創國學院",
    dept: [
      {
        id: "Z23",
        name: "創新國際學院學士班",
        short: "創國學士班",
        identity: ["學"],
      },
    ],
  },
  資訊學院: {
    short: "資訊學院",
    dept: [
      {
        id: "703",
        name: "資訊科學系",
        short: "資科系",
        identity: ["學", "碩", "博"],
      },
      {
        id: "781",
        name: "數位內容與科技學士學位學程",
        short: "數位學",
        identity: ["學"],
      },
      {
        id: "783",
        name: "人工智慧應用學士學位學程",
        short: "人智應學士",
        identity: ["學"],
      },
    ],
  },
};

const departments: Departments = {
  文學院: [
    {
      id: "101",
      name: "中國文學系",
      short: "中文系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "103",
      name: "歷史學系",
      short: "歷史系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "104",
      name: "哲學系",
      short: "哲學系",
      identity: ["學", "碩", "博"],
    },
  ],
  社會科學學院: [
    {
      id: "202",
      name: "政治學系",
      short: "政治系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "204",
      name: "社會學系",
      short: "社會系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "205",
      name: "財政學系",
      short: "財政系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "206",
      name: "公共行政學系",
      short: "公行系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "207",
      name: "地政學系",
      short: "地政系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "208",
      name: "經濟學系",
      short: "經濟系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "209",
      name: "民族學系",
      short: "民族系",
      identity: ["學", "碩", "博"],
    },
  ],
  商學院: [
    {
      id: "301",
      name: "國際經營與貿易學系",
      short: "國貿系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "302",
      name: "金融學系",
      short: "金融系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "303",
      name: "會計學系",
      short: "會計系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "304",
      name: "統計學系",
      short: "統計系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "305",
      name: "企業管理學系",
      short: "企管系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "306",
      name: "資訊管理學系",
      short: "資管系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "307",
      name: "財務管理學系",
      short: "財管系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "308",
      name: "風險管理與保險學系",
      short: "風管系",
      identity: ["學", "碩", "博"],
    },
  ],
  傳播學院: [
    {
      id: "400",
      name: "傳播學院",
      short: "傳播學",
      identity: ["學"],
    },
    {
      id: "401",
      name: "新聞學系",
      short: "新聞系",
      identity: ["學"],
    },
    {
      id: "402",
      name: "廣告學系",
      short: "廣告系",
      identity: ["學"],
    },
    {
      id: "403",
      name: "廣播電視學系",
      short: "廣電系",
      identity: ["學"],
    },
    {
      id: "405",
      name: "傳播學院大一大二不分系",
      short: "傳院不分系",
      identity: ["學"],
    },
  ],
  外國語文學院: [
    {
      id: "500",
      name: "外國語文學院",
      short: "外國語",
      identity: ["學"],
    },
    {
      id: "501",
      name: "英國語文學系",
      short: "英文系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "502",
      name: "阿拉伯語文學系",
      short: "阿文系",
      identity: ["學"],
    },
    {
      id: "504",
      name: "斯拉夫語文學系",
      short: "斯語系",
      identity: ["學", "碩"],
    },
    {
      id: "506",
      name: "日本語文學系",
      short: "日文系",
      identity: ["學", "碩"],
    },
    {
      id: "507",
      name: "韓國語文學系",
      short: "韓文系",
      identity: ["學", "碩"],
    },
    {
      id: "508",
      name: "土耳其語文學系",
      short: "土文系",
      identity: ["學"],
    },
    {
      id: "509",
      name: "歐洲語文學系",
      short: "歐文學系",
      identity: ["學"],
    },
    {
      id: "510",
      name: "東南亞語文學系",
      short: "東南系",
      identity: ["學"],
    },
  ],
  法學院: [
    {
      id: "601",
      name: "法律學系",
      short: "法律系",
      identity: ["學", "碩", "博"],
    },
  ],
  理學院: [
    {
      id: "701",
      name: "應數系",
      short: "應數系",
      identity: ["學"],
    },
    {
      id: "702",
      name: "心理系",
      short: "心理系",
      identity: ["學"],
    },
    {
      id: "782",
      name: "電子物理學士學位學程",
      short: "電物學士學程",
      identity: ["學"],
    },
  ],
  國際事務學院: [
    {
      id: "203",
      name: "外交學系",
      short: "外交系",
      identity: ["學", "碩", "博"],
    },
  ],
  教育學院: [
    {
      id: "152",
      name: "教育學系",
      short: "教育系",
      identity: ["學", "碩", "博"],
    },
  ],
  創新國際學院: [
    {
      id: "Z23",
      name: "創新國際學院學士班",
      short: "創國學士班",
      identity: ["學"],
    },
  ],
  資訊學院: [
    {
      id: "703",
      name: "資訊科學系",
      short: "資科系",
      identity: ["學", "碩", "博"],
    },
    {
      id: "781",
      name: "數位內容與科技學士學位學程",
      short: "數位學",
      identity: ["學"],
    },
    {
      id: "783",
      name: "人工智慧應用學士學位學程",
      short: "人智應學士",
      identity: ["學"],
    },
  ],
  運動學程: [
    {
      id: "NU1",
      name: "運動產業與文化學士學位學程",
      short: "運動學程",
      identity: ["學"],
    },
  ],
};

const schoolYear = [
  { value: "113" },
  { value: "112" },
  { value: "111" },
  { value: "110" },
  { value: "109" },
  { value: "108" },
  { value: "107" },
  { value: "106" },
];

export { majors, departments, schoolYear };
