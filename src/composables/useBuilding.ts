import { buildings } from "~/assets/SouthOrNorthBuilding";

export const useBuildingInputCheck = (inputValue: string) => {
  if (inputValue.length == 4) return inputValue;
  if (inputValue.length == 3) return "0" + inputValue;
  if (inputValue.length == 6 && inputValue.indexOf("27") == 0)
    return inputValue.substring(2, 6);
  return "請輸入正確代碼";
};

export const useFindBuilding = (roomNumber: string) => {
  const result = buildings.find(
    (building) => building.buildingNumber == roomNumber
  );
  return result ? result : "綜院無此教室！";
};
