interface WeatherValue {
  time: string;
  data: Array<any>;
}

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    MinCI: [] as WeatherValue[],
    MaxCI: [] as WeatherValue[],
    MinT: [] as WeatherValue[],
    MaxT: [] as WeatherValue[],
    PoP12h: [] as WeatherValue[],
    T: [] as WeatherValue[],
    Wx: [] as WeatherValue[],
    WeatherDescription: [] as WeatherValue[],
    ContRainDay: 0,
  }),
  getters: {
    getTemputure: (state) =>
      state.T.length > 0
        ? state.T[0].data.find((r) => r.measures == "攝氏度").value
        : "--",
    getHighTempture: (state) =>
      state.MaxT.length > 0
        ? state.MaxT[0].data.find((r) => r.measures == "攝氏度").value
        : "--",
    getLowTempture: (state) =>
      state.MinT.length > 0
        ? state.MinT[0].data.find((r) => r.measures == "攝氏度").value
        : "--",
    getWeatherHint: (state) =>
      state.Wx.length > 0
        ? state.Wx[0].data.find((r) => r.measures == "自定義 Wx 文字").value
        : "--",
    getWeatherHintId: (state) =>
      state.Wx.length > 0
        ? state.Wx[0].data.find((r) => r.measures == "自定義 Wx 單位").value
        : "--",
    getWeatherDescription: (state) =>
      state.WeatherDescription.length > 0
        ? state.WeatherDescription[0].data[0].value
        : "--",
    getRainProb: (state) =>
      state.PoP12h.length > 0
        ? state.PoP12h[0].data.find((r) => r.measures == "百分比").value
        : "",
    getWetDegree: (state) => 0,
    getContRainDays: (state) => state.ContRainDay,
  },
  actions: {
    async fetchWeather() {
      await $fetch("/api/getWeather").then((res: any) => {
        this.PoP12h = res.data.PoP12h;
        this.T = res.data.T;
        this.MinCI = res.data.MinCI;
        this.Wx = res.data.Wx;
        this.MaxCI = res.data.MaxCI;
        this.MinT = res.data.MinT;
        this.WeatherDescription = res.data.WeatherDescription;
        this.MaxT = res.data.MaxT;
      });
      await this.getRainContinuous();
    },
    async getRainContinuous() {
      await $fetch("/api/getRainContinuous").then((res: any) => {
        this.ContRainDay = JSON.parse(res).data.rainDayContinuous;
      });
    },
  },
});
