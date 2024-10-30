export function getTodayDate() {
  // UTC+8
  const today = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
  const yyyymmdd = today.toISOString().split("T")[0];
  return yyyymmdd.split("-").join("");
}

export function getDate(TS: any) {
  const dt = new Date(TS);

  let yyyy = dt.getFullYear();

  let MM = String(dt.getMonth() + 1);
  if (MM.toString().length == 1) MM = "0" + MM;

  let dd = String(dt.getDate());
  if (dd.toString().length == 1) dd = "0" + dd;

  return yyyy.toString() + MM.toString() + dd.toString();
}
