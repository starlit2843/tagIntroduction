export const useVendorStore = defineStore("vendor", {
  state: () => ({
    vendors: [] as Array<Vendor>,
    selected: null as Vendor | null,
  }),
  getters: {
    getVendors: (state) => state.vendors,
    getSelected: (state) => state.selected,
  },
  actions: {
    async fetchVendors(mapName: string | null) {
      await $fetch(`/api/${mapName ?? "聖誕市集"}`).then((res: any) => {
        this.vendors = res.data;
      });
    },
    setSelected(id: string) {
      this.selected = this.vendors.filter((vendor) => vendor.number === id)[0]
        ? this.vendors.filter((vendor) => vendor.number === id)[0]
        : null;
    },
  },
});
