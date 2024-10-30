interface Vendor {
  number: string;
  title: string;
  introduction: string;
  link: string;
  items: Array<Item>;
  programList: ProgramList;
}

interface Item {
  name: string;
  introduction: string;
}

interface ProgramList {
  [key: string]: Array<Program>;
}

interface Program {
  name: string;
  time: string;
}
