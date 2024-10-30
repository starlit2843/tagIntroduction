import axios from "axios";

const getGpaData = async (path: string, data: JSON) => {
  return new Promise((res, rej) => {
    axios
      .post("https://gpa-calc.opennccu.com/api/gpa/" + path, data, {
        headers: { authorization: "Z3BhY2FsY3VsYXRvcgo=" },
      })
      .then((response) => {
        let result = response.data;
        result = result.data;

        res({ success: true, data: result });
      })
      .catch((error) => {
        console.log(error);
        rej({ success: false, data: error });
      });
  });
};

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  return getGpaData(event.context.params!.method, data);
});
