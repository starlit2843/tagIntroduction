import { User } from "@firebase/auth";
import { Profile, profileSchema, APIError } from "~/types/profile";
import { arrayKeys } from "~/types/typeConverter";

const loading = ref(false);

export const useUserStore = defineStore("user", {
  state: () => ({
    isLogin: undefined as boolean | undefined,
    isSubmit: undefined as boolean | undefined,
    googleProfile: {
      name: "",
      avatar: "",
      email: "",
      uid: "" as string | null,
    },
    dataAuth: {
      // 個人資料授權
      排課系統: false,
      南棟還是北棟: false,
      我的課表: true,
      臭蟲通報: true,
      最新問卷: true,
    },
    isJsonUploaded: false,
    grade: undefined as string | undefined,
    openTag: ref<Profile>(getDefaults(profileSchema) as Profile),
  }),
  getters: {
    getName: (state) => state.googleProfile.name,
    getAvatar: (state) => state.googleProfile.avatar,
    getEmail: (state) => state.googleProfile.email,
    getIsLogin: (state) => state.isLogin,
    getGrade: (state) => state.grade,
    getIsSubmit: (state) => state.googleProfile.uid,
    getDataAuth: (state) => state.dataAuth,
    getIsJsonUploaded: (state) => state.isJsonUploaded,
    // 使用者自己的 OpenTag
    getOpenTag: (state) => state.openTag,
  },
  actions: {
    async init(user: User | null) {
      // google profile
      if (user == null) {
        this.isLogin = false;
        return;
      }
      this.googleProfile = {
        name: user.displayName || "",
        avatar: user.photoURL || "",
        email: user.email || "",
        uid: user.uid || null,
      };
      this.isLogin = true;

      getJson().then((value) => {
        this.isJsonUploaded = Object.keys(value).length !== 0;
      });

      // user profile
      const idToken = await user.getIdToken();
      loading.value = true;
      const data = await $fetch("/api/user/profile", {
        headers: { authorization: "Bearer " + idToken },
        method: "get",
      });

      loading.value = false;
      this.openTag = data.profile as Profile;
    },
    setDataAuth(
      option:
        | "排課系統"
        | "南棟還是北棟"
        | "我的課表"
        | "臭蟲通報"
        | "最新問卷",
      value: boolean
    ) {
      this.dataAuth[option] = value;
    },
    setGrade(value: string) {
      this.grade = value;
    },
    setIsJsonUploaded(value: boolean) {
      this.isJsonUploaded = value;
    },
    async setOpenTag(partialProfile: Partial<Profile>) {
      const { $firebaseAuth } = useNuxtApp();
      const user = $firebaseAuth.currentUser;
      if (!user) return "登入失敗";
      const idToken = await user.getIdToken();

      for (const key of arrayKeys(this.openTag)) {
        if (partialProfile[key] !== undefined) {
          // @ts-ignore
          partialProfile[key] = partialProfile[key]!.filter((item) =>
            typeof item === "string" ? item.length > 0 : item > 0
          );
        }
      }

      try {
        await $fetch(`/api/user/profile`, {
          headers: { authorization: "Bearer " + idToken },
          method: "POST",
          body: {
            partialProfile,
          },
        });
        return true;
      } catch (e: any) {
        const err = e.data.data as APIError;
        return err.message;
      }
    },
    async deleteAccount() {
      const { $firebaseAuth } = useNuxtApp();
      const user = $firebaseAuth.currentUser;
      if (!user) throw new Error("login first");
      const idToken = await user.getIdToken();

      loading.value = true;
      $fetch("/api/user/profile", {
        headers: { authorization: "Bearer " + idToken },
        method: "delete",
      }).then(() => this.init(user));
    },
  },
});
