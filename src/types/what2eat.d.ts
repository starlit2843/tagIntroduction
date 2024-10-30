type What2EatPriceSelection = "$" | "$$" | "$$$";
type What2EatTimeSelection =
  | "currentTime"
  | "-12"
  | "12-14"
  | "14-18"
  | "18-21";
type What2EatLocationSelection =
  | "left"
  | "right"
  | "fortyFive"
  | "pun"
  | "shinKong"
  | "backdoor"
  | "bridge"
  | "other";
type What2EatFrontdoorLocationSelection =
  | "left"
  | "right"
  | "fortyFive"
  | "pun"
  | "shinKong";

interface What2EatCollectionListType {
  author: string;
  authorId: string;
  cover: string;
  id: string;
  name: string;
}

interface What2EatCollectionType {
  authorUid: string;
  cover: string;
  id: string;
  name: string;
  pool: {
    icon: string;
    name: string;
    shoPId: string;
  }[];
  public: boolean;
  savedCount: number;
}

interface What2EatShopType {
  id: string;
  name: string;
  location: string[];
  address: string;
  available: boolean;
  icon: string;
  phone: string;
  price: "$" | "$$" | "$$$";
  mapsUrl: string;
  tags: string[];
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}
