export const useWhat2EatStore = defineStore("what2eat", {
  state: () => ({
    shops: [] as What2EatShopType[],
  }),
  getters: {
    getShops: (state) => state.shops,
  },
  actions: {
    async fetchShops() {
      const url =
        "https://script.google.com/macros/s/AKfycbzsk_lgB9dvTeOVZ4013zuZtCYV568R0KXOgJ7pqd_3F09hO44Sc3usUL5PnDPzmwUY/exec";

      const response: any = await $fetch(url, { method: "GET" });
      this.shops = response;
    },
  },
});
