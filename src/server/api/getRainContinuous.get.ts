import { getFirestore } from "firebase-admin/firestore";
import { getDate } from "./utils/time";

const db = getFirestore();

const checkRain = async () => {
  return new Promise((resolve, reject) => {
    const cwaApiToken = useRuntimeConfig().public.cwaApiToken;
    const locationName = encodeURI("文山區");
    const elementName = "Wx"; // 天氣現象
    const weatherSite = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=${cwaApiToken}&limit=1&format=JSON&locationName=${locationName}&elementName=${elementName}`;
    $fetch(weatherSite, {
      headers: {
        "Accept-Encoding": "deflate, br",
      },
      method: "get",
    })
      .then(async function (response: any) {
        if (
          response.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value.match(
            "雨"
          )
        ) {
          // upload rain record to firebase
          const yyyymmdd = getDate(new Date());
          const yyyymmddYesterday = getDate(
            new Date().setDate(new Date().getDate() - 1)
          );
          const rainRecord = db.collection("rainDayRecord").doc(yyyymmdd);
          const rainRecordYesterday = db
            .collection("rainDayRecord")
            .doc(yyyymmddYesterday);
          const docYesterday = await rainRecordYesterday.get();
          if (!docYesterday.exists) {
            console.log("No such document... create a new one.");
            rainRecordYesterday.set({
              rainDayContinuous: 0,
            });
            return 1;
          } else {
            await rainRecord.set({
              rainDayContinuous: docYesterday.data()?.rainDayContinuous + 1,
            });
            return docYesterday.data()?.rainDayContinuous + 1;
          }
        }
        resolve({
          success: true,
          data: response.records.locations[0].location[0].weatherElement[0],
        });
      })
      .catch(function (error) {
        console.log(error);
        reject({ success: false, data: error });
      });
  });
};

const getRainContinuous = async () => {
  checkRain();
  try {
    let yyyymmdd = getDate(new Date());
    const rainRecord = db.collection("rainDayRecord").doc(yyyymmdd);
    const doc = await rainRecord.get();
    if (!doc.exists) {
      return JSON.stringify(
        {
          success: true,
          data: {
            rainDayContinuous: 0,
          },
        },
        null,
        4
      );
    } else {
      return JSON.stringify(
        {
          success: true,
          data: doc.data(),
        },
        null,
        4
      );
    }
  } catch (err: any) {
    return JSON.stringify(
      {
        success: false,
        message: err.message,
        data: {},
      },
      null,
      4
    );
  }
};

export default defineEventHandler(async () => {
  return await getRainContinuous();
});
