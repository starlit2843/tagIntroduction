interface Majors {
  [key: string]: {
    id?: number | string;
    short: string;
    dept: Array<Department>;
  };
}

interface Departments {
  [key: string]: Array<Department>;
}

interface Department {
  id: number | string;
  name: string;
  short: string;
  identity: string[];
}
