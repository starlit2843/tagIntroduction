import { departments } from "assets/message";

export const useDept = () => {
  const deptName = (id?: string) => {
    if (!id) return "";
    const depts = Object.keys(departments).reduce(
      (list, yuan) => [...list, ...departments[yuan]],
      [] as Department[]
    );
    const dept = depts.find((_dept) => _dept.id === id);
    if (dept) return dept.name;
    else return "";
  };

  return { deptName };
};

export default useDept;
