export const useGetCollection = async (collectionId: string) => {
  return await $fetch(`/api/what2eat/collection?collectionId=${collectionId}`, {
    method: "GET",
  });
};

export const useGetOfficialCollectionList = async () => {
  return await $fetch("/api/what2eat/collectionList?id=official", {
    method: "GET",
  });
};

export const useGetSavedCollectionList = async () => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return [];
  const idToken = await user.getIdToken();
  return $fetch("/api/what2eat/collectionList", {
    headers: { authorization: "Bearer " + idToken },
    method: "GET",
  });
};

export const useCreateCollection = async (param: any) => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return;
  const idToken = await user.getIdToken();
  return $fetch("/api/what2eat/createCollection", {
    headers: { authorization: "Bearer " + idToken },
    method: "post",
    body: param,
  });
};

export const useFilterShops = (
  shops: What2EatShopType[],
  time: What2EatTimeSelection,
  price: What2EatPriceSelection[],
  location: What2EatLocationSelection[]
) => {
  const locations = {
    left: "校門左側",
    right: "校門右側",
    fortyFive: "45 巷",
    pun: "ㄆㄨㄣ街",
    shinKong: "新光路",
    other: "其他",
    backdoor: "政大後山",
    bridge: "過橋",
  };

  const timeFilteredShops = filterTime(shops, time);

  if (price.length == 0 && location.length == 0) return timeFilteredShops;

  if (price.length == 0) {
    return timeFilteredShops.filter((shop) => {
      // Check if any location in shop.location matches a location in locationSelections
      return location.some((loc) => shop.location.includes(locations[loc]));
    });
  }

  if (location.length == 0)
    return timeFilteredShops.filter((shop) => price.includes(shop.price));

  return timeFilteredShops.filter(
    (shop) =>
      location.some((loc) => shop.location.includes(locations[loc])) &&
      price.includes(shop.price)
  );
};

const filterTime = (
  shops: What2EatShopType[],
  time: What2EatTimeSelection
): What2EatShopType[] => {
  type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  const weekday = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .toLowerCase() as Weekday;

  switch (time) {
    case "-12":
      return shops.filter((shop) =>
        shop[weekday].substring(0, 72).includes("1")
      );
    case "12-14":
      return shops.filter((shop) =>
        shop[weekday].substring(72, 84).includes("1")
      );
    case "14-18":
      return shops.filter((shop) =>
        shop[weekday].substring(84, 108).includes("1")
      );
    case "18-21":
      return shops.filter((shop) =>
        shop[weekday].substring(108, 144).includes("1")
      );
    default: {
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      return shops.filter(
        (shop) =>
          shop[weekday].at(hour * 6 + Math.round(minute / 10) - 1) == "1"
      );
    }
  }
};
