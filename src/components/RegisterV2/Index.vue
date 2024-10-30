<template>
  <div
    class="flex max-w-[300px] flex-col gap-4 rounded-lg p-6 shadow-numo-card"
  >
    <div class="flex justify-center">
      <img
        src="~/assets/images/LogoWithTitle.png"
        class="mb-2 w-full max-w-[200px]"
      />
    </div>
    <template v-if="isLogin === true">
      <div class="flex flex-col gap-4" v-if="stage === 0">
        <div class="px-3">
          <h2 class="font-bold">歡迎註冊 Open NCCU！</h2>
          <p class="text-sm">
            我們是一個致力於優化政大數位體驗的獨立組織，希望提供政大學生更好的數位工具。
          </p>
        </div>
        <span class="px-3 font-bold">本系系所/入學年份</span>
        <div class="flex gap-4">
          <RegisterV2Select
            :array="depts"
            :value="major"
            @input="(v) => (major = v)"
            :class="
              validate && majorError ? 'grow border-2 border-red-500' : 'grow'
            "
          />
          <RegisterV2Select
            :array="years"
            :value="majorYear"
            @input="(v) => (majorYear = v)"
            nullOption="--"
            :class="
              validate && majorError
                ? 'shrink-0 border-2 border-red-500'
                : 'shrink-0'
            "
          />
        </div>
        <div class="mt-5 flex gap-10 px-5">
          <button @click="logout" class="shrink-0 p-2">取消</button>
          <button
            @click="handleToStage2"
            class="grow rounded-md p-2 shadow-numo-light"
          >
            下一步
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4" v-if="stage === 1">
        <span class="px-3 font-bold">雙主修系所/主修年份</span>
        <div class="flex gap-4">
          <RegisterV2Select
            :array="depts"
            :value="major2"
            @input="(v) => (major2 = v)"
            :class="
              validate && major2Error ? 'grow border-2 border-red-500' : 'grow'
            "
          />
          <RegisterV2Select
            :array="years"
            :value="major2Year"
            @input="(v) => (major2Year = v)"
            nullOption="--"
            :class="
              validate && major2Error
                ? 'shrink-0 border-2 border-red-500'
                : 'shrink-0'
            "
          />
        </div>
        <span class="px-3 font-bold">輔系1/輔系年份</span>
        <div class="flex gap-4">
          <RegisterV2Select
            :array="depts"
            :value="minor1"
            @input="(v) => (minor1 = v)"
            :class="
              validate && minor1Error ? 'grow border-2 border-red-500' : 'grow'
            "
          />
          <RegisterV2Select
            :array="years"
            :value="minor1Year"
            @input="(v) => (minor1Year = v)"
            nullOption="--"
            :class="
              validate && minor1Error
                ? 'shrink-0 border-2 border-red-500'
                : 'shrink-0'
            "
          />
        </div>
        <span class="px-3 font-bold">輔系2/輔系年份</span>
        <div class="flex gap-4">
          <RegisterV2Select
            :array="depts"
            :value="minor2"
            @input="(v) => (minor2 = v)"
            :class="
              validate && minor2Error ? 'grow border-2 border-red-500' : 'grow'
            "
          />
          <RegisterV2Select
            :array="years"
            :value="minor2Year"
            @input="(v) => (minor2Year = v)"
            nullOption="--"
            :class="
              validate && minor2Error
                ? 'shrink-0 border-2 border-red-500'
                : 'shrink-0'
            "
          />
        </div>
        <div class="mt-5 flex gap-10 px-5">
          <button
            @click="
              stage++;
              skip = true;
            "
            class="shrink-0 p-2"
          >
            略過
          </button>
          <button
            @click="handleToStage3"
            class="grow rounded-md p-2 shadow-numo-light"
          >
            下一步
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4" v-if="stage === 2">
        <p>
          資料填寫完成 >_O！<br /><br />
          本系統所存取之學籍資料，<br />僅提供課務系統使用，<br />
          絕不外流或作為商業用途。
        </p>
        <div class="mt-5 flex gap-10 px-5">
          <button @click="stage = 0" class="shrink-0 p-2">上一步</button>
          <button
            @click="handleSubmit"
            class="grow rounded-md p-2 shadow-numo-light"
          >
            確認註冊
          </button>
        </div>
      </div>
    </template>
    <template v-if="isLogin === false">
      <button
        @click="login"
        class="flex w-full max-w-[200px] justify-around rounded-md bg-base p-3 font-bold text-base-content shadow-numo-card"
      >
        <img src="~/assets/images/Google.png" />Sign in with Google
      </button>
      <button
        class="flex w-full max-w-[200px] justify-around rounded-md bg-base-100 p-3 font-bold text-base-content shadow-numo-card"
        disabled
      >
        <img src="~/assets/images/Apple.png" />Sign in with Apple
      </button>
      <p class="font-bold">登入以使用個人化功能</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { departments, schoolYear } from "~/assets/message";

const user = useUserStore();
const { isLogin } = storeToRefs(user);
const route = useRoute();

const login = async () => {
  await useGoogleLogin();
};

const logout = async () => {
  await useGoogleLogout();
};

const depts = computed(() => {
  return Object.keys(departments).map((yuan: string) => ({
    name: yuan,
    value: departments[yuan].map((_dept) => ({
      name: _dept.short,
      value: _dept.id,
    })),
  }));
});

const years = computed(() => [
  {
    name: "年分",
    value: schoolYear.map((year) => ({ name: year.value, value: year.value })),
  },
]);

const stage = ref(0);
const skip = ref(false);

const major = ref("-1");
const majorYear = ref("-1");
const major2 = ref("-1");
const major2Year = ref("-1");
const minor1 = ref("-1");
const minor1Year = ref("-1");
const minor2 = ref("-1");
const minor2Year = ref("-1");

const validate = ref(false);

const majorError = computed(() => {
  return major.value === "-1" || majorYear.value === "-1";
});

const major2Error = computed(() => {
  return (
    (major2.value === "-1" && major2Year.value !== "-1") ||
    (major2.value !== "-1" && major2Year.value === "-1")
  );
});

const minor1Error = computed(() => {
  return (
    (minor1.value === "-1" && minor1Year.value !== "-1") ||
    (minor1.value !== "-1" && minor1Year.value === "-1")
  );
});

const minor2Error = computed(() => {
  return (
    (minor2.value === "-1" && minor2Year.value !== "-1") ||
    (minor2.value !== "-1" && minor2Year.value === "-1")
  );
});

const handleToStage2 = () => {
  validate.value = true;
  if (!majorError.value) {
    stage.value++;
    validate.value = false;
  }
};

const handleToStage3 = () => {
  validate.value = true;
  if (!major2Error.value && !minor1Error.value && !minor2Error.value) {
    stage.value++;
    validate.value = false;
  }
};

const handleSubmit = () => {
  if (skip.value) {
    useRegister({
      major: major.value,
      major_year: majorYear.value,
      double_major: "",
      double_major_year: "",
      minor_1: "",
      minor_1_year: "",
      minor_2: "",
      minor_2_year: "",
    }).then((res) => {
      console.log(res);
      window.location.href = route.query.continue?.toString() || "/";
    });
  }
  useRegister({
    major: major.value,
    major_year: majorYear.value,
    double_major: major2.value === "-1" ? "" : major2.value,
    double_major_year: major2Year.value === "-1" ? "" : major2Year.value,
    minor_1: minor1.value === "-1" ? "" : minor1.value,
    minor_1_year: minor1Year.value === "-1" ? "" : minor1Year.value,
    minor_2: minor2.value === "-1" ? "" : minor2.value,
    minor_2_year: minor2Year.value === "-1" ? "" : minor2Year.value,
  }).then((res) => {
    console.log(res);
    window.location.href = route.query.continue?.toString() || "/";
  });
};
</script>
