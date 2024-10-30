import { useWeatherStore } from "./weather";

export const useDownvoteStore = defineStore("downvote", {
  state: () => ({
    downvote: 0,
  }),
  getters: {
    getDownvote: (state) => state.downvote,
  },
  actions: {
    async fetchDownvote() {
      const weather = useWeatherStore();
      weather.getRainContinuous().then(async () => {
        const contRainDays = weather.getContRainDays;
        if (contRainDays > 0) {
          // 連續降雨，累計倒讚
          await $fetch(`/api/downvote/accumulation`, {
            method: "post",
          });
        }
      });

      // 取得今天的倒讚數
      await $fetch("/api/downvote/get").then((res: any) => {
        this.downvote = res.data.count + res.data.accumulation;
      });
    },
    async addDownvote() {
      this.downvote += 1;

      // 使用Optimistic UI，先更新畫面，再發送請求，若請求失敗則回復畫面

      const success = await $fetch("/api/downvote/add", {
        method: "post",
      })
        .then((res: any) => {
          if (!res.success) {
            setTimeout(() => {
              this.downvote -= 1;
            }, 1000);
          }
          return res.success;
        })
        .catch((err) => console.error(err));
      return success;
    },
  },
});
