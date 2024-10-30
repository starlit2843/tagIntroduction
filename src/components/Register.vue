<template>
  <div
    v-if="isLogin && (dept.major === '' || dept.major_year === '') && !loading"
    class="absolute left-0 top-0 z-10 grid h-screen w-screen justify-items-center bg-black/70"
  >
    <Transition name="slide-up" mode="out-in" appear>
      <div
        v-if="nowState === 'atMajorChoice'"
        class="absolute mt-[12.5%] flex flex-col justify-center gap-4 rounded-lg bg-white px-6 pb-5 pt-3 sm:px-10 sm:pb-10 sm:pt-5"
      >
        <img
          src="~/assets/images/LogoWithTitle.png"
          class="mt-4 w-full max-w-[200px] self-center"
        />
        <form
          action=""
          :class="{ 'was-validated': validityChecked }"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div>
            <p class="mb-2 flex text-[#959595]">本系系所/入學年份</p>
            <p class="text-red-700">&#160;*</p>
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <select
              id="major"
              required
              v-model="major"
              @invalid="handleUserInvalid"
              @input="checkMajor"
              class="mt-3 appearance-none rounded-lg border-2 border-transparent bg-base px-3 py-2 text-center font-bold text-base-content shadow-numo-button hover:bg-gray-100 sm:px-6"
            >
              <option value="" selected>
                未選擇
                &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#xf0d7;
              </option>
              <optgroup
                v-for="(group, name) in departments"
                :label="name"
                :key="name"
              >
                <option
                  v-for="option in group"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.short }}
                </option>
              </optgroup>
            </select>

            <select
              id="major_year"
              required
              v-model="majorYear"
              @input="checkMajorYear"
              class="ml-3 appearance-none rounded-lg border-2 border-transparent bg-base px-1 py-2 text-center font-bold text-base-content shadow-numo-button hover:bg-gray-100 sm:px-5"
            >
              <option value="" selected>– – &#160;&#160; &#xf0d7;</option>
              <option v-for="year in schoolYear" :value="year.value">
                {{ year.value }}
              </option>
            </select>
          </div>

          <div class="mb-3 mt-10 flex items-center justify-between">
            <p
              @click="logout"
              class="ml-7 cursor-pointer text-base-content active:scale-95"
            >
              取消
            </p>
            <input
              @click="
                major != '' && majorYear != ''
                  ? (nowState = 'afterMajor')
                  : (nowState = 'atMajorChoice')
              "
              type="submit"
              value="下一步"
              class="cursor-pointer rounded-lg bg-base px-8 py-3 text-base-content shadow-numo-button active:scale-95 sm:px-14"
            />
          </div>
        </form>
      </div>

      <div
        v-else-if="nowState === 'afterMajor'"
        class="absolute mt-[5%] flex flex-col justify-center gap-4 rounded-lg bg-white px-8 pb-5 pt-5 sm:px-10 sm:pb-10"
      >
        <div
          @click="nowState = 'atMajorChoice'"
          class="-ml-5 flex cursor-pointer items-center gap-2"
        >
          <img :src="ReturnIcon" />
          <div class="text-primary-02">返回</div>
        </div>
        <img
          src="~/assets/images/LogoWithTitle.png"
          class="w-full max-w-[175px] self-center sm:max-w-[200px]"
        />
        <div>
          <p class="sm:text-md mb-2 flex text-sm text-base-content">
            雙主修系所/主修年份
          </p>
          <ChoiceDep
            @handleChange="(val) => (major_2 = val)"
            @handleChangeYear="(val) => (major_2_year = val)"
          />
        </div>
        <div>
          <p class="sm:text-md mb-2 mt-2 flex text-sm text-base-content">
            輔系1/輔系年份
          </p>
          <ChoiceDep
            @handleChange="(val) => (minor_1 = val)"
            @handleChangeYear="(val) => (minor_1_year = val)"
          />
        </div>
        <div>
          <p class="sm:text-md mb-2 mt-2 flex text-sm text-base-content">
            輔系2/輔系年份
          </p>
          <ChoiceDep
            @handleChange="(val) => (minor_2 = val)"
            @handleChangeYear="(val) => (minor_2_year = val)"
          />
        </div>
        <div class="mt-7 flex items-center justify-between">
          <p
            @click="nowState = 'afterMinor'"
            class="sm:text-md ml-7 cursor-pointer text-sm text-base-content active:scale-95"
          >
            跳過
          </p>
          <button
            @click="nowState = 'afterMinor'"
            class="sm:text-md rounded-lg bg-base px-14 py-3 text-sm text-base-content shadow-numo-button active:scale-95"
          >
            下一步
          </button>
        </div>
      </div>

      <div
        v-else-if="nowState === 'afterMinor'"
        class="bg-glass absolute mt-[10%] flex flex-col justify-center gap-4 rounded-lg bg-white px-8 pb-10 pt-5 sm:px-16"
      >
        <img
          src="~/assets/images/LogoWithTitle.png"
          class="mt-2 w-full max-w-[200px] self-center"
        />
        <p>
          資料填寫完成 >_O ! <br />
          本系統存取之學籍資料， <br />
          僅提供課務系統使用， <br />
          絕不外流或作為商業用途。
        </p>
        <div class="mb-3 mt-7 flex items-center justify-between">
          <p
            @click="nowState = 'afterMajor'"
            class="mr-2 cursor-pointer text-base-content active:scale-95 sm:mr-5"
          >
            上一步
          </p>
          <button
            @click="handleRegister"
            class="rounded-lg bg-base px-6 py-3 text-base-content shadow-numo-card active:scale-95 sm:px-14"
          >
            確認註冊
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// import user login information
// import { useProfileStore } from "~/stores/profile";
import ReturnIcon from "~/assets/icon/SouthOrNorth/return.svg?url";
// data for selecting departments
import { departments, schoolYear } from "~/assets/message";

const nowState = ref("atMajorChoice");

// const profile = useProfileStore();
// const { dept, isLogin, loading } = storeToRefs(profile);
// const { register } = profile;

const validityChecked = ref(false);
const majorError = ref(true);
const majorYearError = ref(true);
const major = ref("");
const majorYear = ref("");
const minor_1 = ref("");
const minor_1_year = ref("");
const minor_2 = ref("");
const minor_2_year = ref("");
const major_2 = ref("");
const major_2_year = ref("");

const logout = async () => {
  await useGoogleLogout();
};

function handleSubmit(event) {
  const form = event.target;
  validityChecked.value = true;
  if (form.checkValidity()) {
    console.log("submitting");
  }
}

function checkMajor(event) {
  if (event.target.checkValidity()) {
    majorError.value = "";
  }
}

function checkMajorYear(event) {
  if (event.target.checkValidity()) {
    majorYearError.value = "";
  }
}

function handleUserInvalid(event) {
  majorError.value = event.srcElement.validationMessage;
}

async function handleRegister() {
  register({
    major: major.value,
    major_year: majorYear.value,
    double_major: major_2.value,
    double_major_year: major_2_year.value,
    minor_1: minor_1.value,
    minor_1_year: minor_1_year.value,
    minor_2: minor_2.value,
    minor_2_year: minor_2_year.value,
  }).then((data) => (profile.value = data));
}
</script>

<style scope>
.was-validated select:invalid {
  @apply border-rose-600 text-rose-600 duration-1000;
}
select {
  font-family: "FontAwesome";
}
</style>
