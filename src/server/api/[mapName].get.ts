async function getData(mapName: string | undefined) {
  return new Promise(function (resolve, reject) {
    const activityName = encodeURI(mapName ?? "聖誕市集");
    $fetch(
      "https://script.google.com/macros/s/AKfycby72MaA43fcsOkiQXwgF2PIa4KahodWJF_xNQ_DYHJPtowYR-nHrSPM-9yB_BOnCYtn/exec?sheetName=" +
        activityName,
      {
        headers: {
          "Accept-Encoding": "deflate, br",
          "Content-Type": "text/plain;charset=utf-8",
        },
        method: "get",
      }
    )
      .then(function (response: any) {
        const result: any[] = [];
        response.forEach((element: any) => {
          const vendor: Vendor = {
            number:
              typeof element["位置"] === "number" && element["位置"] > 9
                ? element["位置"].toString()
                : typeof element["位置"] === "string"
                ? element["位置"]
                : "0" + element["位置"],
            title: element["攤位名稱"],
            introduction: element["攤位介紹"]
              ? element["攤位介紹"]
              : element["活動介紹"],
            link: element["連結"],
            items: [] as Array<Item>,
            programList: {} as ProgramList,
          };

          const itemData = element["品項"].trim().toString().split("\n");

          for (let itemIndex = 0; itemIndex < itemData.length; itemIndex += 2) {
            if (itemData[itemIndex] === "") break;
            const item: Item = {
              name: itemData[itemIndex],
              introduction: itemData[itemIndex + 1],
            };
            vendor.items.push(item);
          }

          const days = element["節目表"]
            .trim()
            .toString()
            .split("###")
            .slice(1);
          for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            const date: string = days[dayIndex].split("\n")[0];
            vendor.programList[date] = [] as Array<Program>;

            const programData = days[dayIndex].split("\n").slice(1);
            for (
              let programIndex = 0;
              programIndex < programData.filter((e: string) => e !== "").length;
              programIndex += 2
            ) {
              if (programData[programIndex] === "") break;
              vendor.programList[date].push({
                time: programData[programIndex],
                name: programData[programIndex + 1],
              });
            }
          }

          result.push(vendor);
        });

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
export default defineEventHandler(async (event) => {
  return await getData(event.context.params?.mapName);
});
