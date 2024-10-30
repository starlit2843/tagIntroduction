import { featureList } from "~/assets/featureList";

const allFeatures = Object.values(featureList).flat();
const sOrN = allFeatures.findIndex(
  (feature) => feature.name === "南棟還是北棟"
);
const SCSR = allFeatures.findIndex(
  (feature) => feature.name === "Open NCCU\n排課系統"
);
allFeatures.splice(0, 0, allFeatures.splice(sOrN, 1)[0]);
allFeatures.splice(0, 0, allFeatures.splice(SCSR, 1)[0]);

export const useCommonlyUsedStore = defineStore("commonlyUsed", {
  state: () => ({
    featureList: allFeatures.map((feature: CommonlyUsedType) => {
      return {
        name: feature.name,
        selected: JSON.parse(
          localStorage.getItem(feature.name) ??
            (allFeatures.indexOf(feature) === 0 ||
            allFeatures.indexOf(feature) === 1
              ? "true"
              : "false")
        ),
      };
    }),
  }),
  getters: {
    getCommonlyUsed: (state) => state.featureList,
  },
  actions: {
    handleSelect(name: string, value: boolean) {
      const valueString = value ? "true" : "false";
      localStorage.setItem(name, valueString);

      const targetIndex = this.featureList.findIndex(
        (feat) => feat.name === name
      );
      if (targetIndex < 0) return;

      this.featureList[targetIndex].selected = value;
    },
  },
});
