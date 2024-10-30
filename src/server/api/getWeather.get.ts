async function getData() {
  return new Promise(function (resolve, reject) {
    const cwaApiToken = useRuntimeConfig().public.cwaApiToken;
    const locationName = encodeURI("文山區");
    const elementName = [
      "PoP12h",
      "T",
      "MinCI",
      "Wx",
      "MaxCI",
      "MinT",
      "WeatherDescription",
      "MaxT",
    ].join();
    const weatherSite = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=${cwaApiToken}&limit=1&format=JSON&locationName=${locationName}&elementName=${elementName}`;
    $fetch(weatherSite, {
      headers: {
        "Accept-Encoding": "deflate, br",
      },
      method: "get",
    })
      .then(function (response: any) {
        const result =
          response.records.locations[0].location[0].weatherElement.reduce(
            (lastObject: any, current: any) => ({
              ...lastObject,
              [current.elementName]: current.time.map((time: any) => ({
                time: new Date(time.startTime).toISOString(),
                data: time.elementValue,
              })),
            }),
            {}
          );
        resolve({
          success: true,
          data: result,
        });
      })
      .catch(function (error) {
        console.log(error);
        reject({ success: false, data: error });
      });
  });
}
export default defineEventHandler(async () => {
  return await getData();
});

// how to use:
// npm i request
// npm run dev (in terminal)
// goto http://localhost:3000/api/weather (in browser)
