export const useAvatarStore = defineStore("avatar", {
  state: () => ({
    avatar: "" as string,
  }),
  getters: {
    getAvatar: (state) => state.avatar,
  },
  actions: {
    //獲得大頭貼
    async initUploadAvatar() {
      const { $firebaseAuth } = useNuxtApp();
      const user = $firebaseAuth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();
      await $fetch(`/api/user/avatar`, {
        headers: { authorization: "Bearer " + idToken },
        method: "GET",
      }).then((res: any) => {
        this.avatar = res.data.url;
      });
    },
    async uploadAvatar(base64: string) {
      const { $firebaseAuth } = useNuxtApp();
      const user = $firebaseAuth.currentUser;
      if (!user) return "登入失敗";
      const idToken = await user.getIdToken();
      const formData = new FormData();
      formData.append("image", base64);

      try {
        await $fetch(`/api/user/avatar`, {
          headers: {
            authorization: "Bearer " + idToken,
          },
          method: "POST",
          body: formData,
        }).then((res: any) => {
          console.log("success: " + res.success);
          if (res.success) {
            this.initUploadAvatar();
          }
        });
      } catch (e: any) {
        console.error("Error during upload:", e);
        return "上傳失敗";
      }
    },
  },
});
