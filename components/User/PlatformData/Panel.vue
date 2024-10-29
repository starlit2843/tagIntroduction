<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import {
  SHARE_URL_LIMIT,
  type FieldStatus,
  type Profile,
} from "~/types/profile";
import type { WatchCallback, WritableComputedRef } from "vue";
import { debounceFilter } from "@vueuse/core";
import {
  arrayKeys,
  type ObjectValueToType,
  type PrimitiveKeys,
  type ArrayKeys,
} from "~/types/typeConverter";

const { setOpenTag } = useUserStore();

class FieldsManager {
  private storeProfile: Ref<Profile>;
  private copiedProfile: Ref<Profile>;
  private fieldStatus: Ref<ObjectValueToType<Profile, FieldStatus>> = ref({
    nickname: "good",
    customize_id: "good",
    bio: "good",
    share_urls: [],
  });

  private fieldStatusStr: Ref<ObjectValueToType<Profile, string>> = ref({
    nickname: "",
    customize_id: "",
    bio: "",
    share_urls: [],
  });

  private fieldTempStatusStr: Ref<ObjectValueToType<Profile, string>> = ref({
    nickname: "",
    customize_id: "",
    bio: "",
    share_urls: [],
  });

  private arrItemMaxLength: Record<ArrayKeys<Profile>, number> = {
    share_urls: SHARE_URL_LIMIT,
  };

  constructor({ storeProfile }: { storeProfile: Ref<Profile> }) {
    this.storeProfile = storeProfile;
    this.copiedProfile = ref(deepCopy(this.storeProfile.value));
    for (const key of arrayKeys(this.copiedProfile.value)) {
      this.fieldStatus.value[key] = Array(this.arrItemMaxLength[key]).fill(
        "good"
      );
      this.fieldStatusStr.value[key] = Array(this.arrItemMaxLength[key]).fill(
        ""
      );
      this.fieldTempStatusStr.value[key] = Array(
        this.arrItemMaxLength[key]
      ).fill("");
      // @ts-ignore
      this.copiedProfile.value[key] = Array(this.arrItemMaxLength[key])
        .fill(null) // otherwise idx will be undefined
        .map((_, idx) => this.copiedProfile.value[key][idx] ?? "");
    }

    this.uploaderDaemon = watchPausable(this.nextLoadings, this.uploader, {
      deep: true,
      eventFilter: debounceFilter(2000), // 不打字2000ms上傳
    });
  }

  private uploaderDaemon;

  private nextUpload: Partial<Profile> = {};
  private nextLoadings = reactive(
    [] as {
      status: WritableComputedRef<FieldStatus>;
      statusStr: WritableComputedRef<string>;
      tempStatusStr: WritableComputedRef<string>;
    }[]
  );

  private uploader: WatchCallback<typeof this.nextLoadings> = async (
    loadings
  ) => {
    this.uploaderDaemon.pause();
    const curUpload = this.nextUpload;
    this.nextUpload = {};
    if (Object.keys(curUpload).length > 0) {
      loadings.forEach((i) => {
        i.status = "running";
        i.statusStr = "處理中...";
        i.tempStatusStr = "";
      });

      const uploadStatus = await setOpenTag(curUpload);
      if (uploadStatus === true) {
        // 上傳成功
        this.storeProfile.value = {
          ...this.storeProfile.value,
          ...curUpload,
        };
        loadings.forEach((i) => {
          i.status = "good";
          i.statusStr = "";
          i.tempStatusStr = "儲存成功";
        });
      } else {
        // TODO: 將不同的錯誤分到不同的輸入框，並且嘗試把其他沒遇到錯誤的格子重試
        loadings.forEach((i) => {
          i.status = "bad";
          i.statusStr = uploadStatus;
          i.tempStatusStr = "";
        });
      }
    }

    loadings.forEach(() => this.nextLoadings.shift());

    // 檢查有無新的要上傳的
    if (this.nextLoadings.length > 0) {
      await new Promise((done) => setTimeout(done, 2000));
      this.uploader(this.nextLoadings, undefined, () => {}); // only first parameter counts
    } else {
      this.uploaderDaemon.resume();
    }
  };

  private updatedArray<T, U>(
    source: (T | U)[] | undefined | null,
    indexOfNewValue: number,
    newValue: U
  ): (T | U)[] {
    if (source) {
      return source
        .slice(0, indexOfNewValue)
        .concat(newValue, ...source.slice(indexOfNewValue + 1));
    } else {
      return new Array(indexOfNewValue).concat(newValue);
    }
  }

  /**
   * 直接給使用者輸入的欄位資料
   * @param key 欄位名稱
   */
  vmodel<K extends PrimitiveKeys<Profile>>(
    key: K
  ): WritableComputedRef<Profile[K]>;
  /**
   * 直接給使用者輸入的欄位資料
   * @param key 欄位名稱
   * @param index 陣列欄位的第幾個
   */
  vmodel<K extends ArrayKeys<Profile>>(
    key: K,
    index: number
  ): WritableComputedRef<Profile[K][number]>;
  vmodel<K extends keyof Profile>(key: K, index?: number) {
    const mgr = this;
    // supports array and primitives only
    if (
      Array.isArray(mgr.copiedProfile.value[key]) &&
      typeof index === "number"
    ) {
      // array
      return computed({
        get() {
          return mgr.copiedProfile.value[key][index];
        },
        set(value) {
          mgr.copiedProfile.value[key] = mgr.updatedArray(
            mgr.copiedProfile.value[key] as Array<Profile[K][number]>,
            index,
            value
          ) as Profile[K];
        },
      });
    } else {
      // primitives
      return computed({
        get() {
          return mgr.copiedProfile.value[key];
        },
        set(value) {
          mgr.copiedProfile.value[key] = value;
        },
      });
    }
  }

  /**
   * 該欄位目前是正常、有問題、正常上傳
   * @param key 欄位名稱
   */
  vmodelStatus<K extends PrimitiveKeys<Profile>>(
    key: K
  ): WritableComputedRef<FieldStatus>;
  /**
   * 該欄位目前是正常、有問題、正常上傳
   * @param key 欄位名稱
   * @param index 陣列欄位的第幾個
   */
  vmodelStatus<K extends ArrayKeys<Profile>>(
    key: K,
    index: number
  ): WritableComputedRef<FieldStatus>;
  vmodelStatus<K extends keyof Profile>(key: K, index?: number) {
    const mgr = this;
    // supports array and primitives only
    if (
      Array.isArray(mgr.fieldStatus.value[key]) &&
      typeof index === "number"
    ) {
      // array
      return computed({
        get() {
          return (mgr.fieldStatus.value[key] as Array<FieldStatus>)[index];
        },
        set(status) {
          (mgr.fieldStatus.value[key] as Array<FieldStatus>)[index] = status;
        },
      });
    } else {
      // primitive
      return computed({
        get() {
          return mgr.fieldStatus.value[key];
        },
        set(status) {
          mgr.fieldStatus.value[key] = status;
        },
      });
    }
  }

  /**
   * 該欄位的狀態描述文字
   * @param key 欄位名稱
   */
  vmodelStatusStr<K extends PrimitiveKeys<Profile>>(
    key: K
  ): WritableComputedRef<string>;
  /**
   * 該欄位的狀態描述文字
   * @param key 欄位名稱
   * @param index 陣列欄位的第幾個
   */
  vmodelStatusStr<K extends ArrayKeys<Profile>>(
    key: K,
    index: number
  ): WritableComputedRef<string>;
  vmodelStatusStr<K extends keyof Profile>(key: K, index?: number) {
    const mgr = this;
    // supports array and primitives only
    if (
      Array.isArray(mgr.fieldStatusStr.value[key]) &&
      typeof index === "number"
    ) {
      // array
      return computed({
        get() {
          return (mgr.fieldStatusStr.value[key] as Array<string>)[index];
        },
        set(statusStr) {
          (mgr.fieldStatusStr.value[key] as Array<string>)[index] = statusStr;
        },
      });
    } else {
      // primitive
      return computed({
        get() {
          return mgr.fieldStatusStr.value[key];
        },
        set(statusStr) {
          mgr.fieldStatusStr.value[key] = statusStr;
        },
      });
    }
  }

  /**
   * 該欄位的短期狀態描述文字
   * @param key 欄位名稱
   */
  vmodelTempStatusStr<K extends PrimitiveKeys<Profile>>(
    key: K
  ): WritableComputedRef<string>;
  /**
   * 該欄位的短期狀態描述文字
   * @param key 欄位名稱
   * @param index 陣列欄位的第幾個
   */
  vmodelTempStatusStr<K extends ArrayKeys<Profile>>(
    key: K,
    index: number
  ): WritableComputedRef<string>;
  vmodelTempStatusStr<K extends keyof Profile>(key: K, index?: number) {
    const mgr = this;
    // supports array and primitives only
    if (
      Array.isArray(mgr.fieldTempStatusStr.value[key]) &&
      typeof index === "number"
    ) {
      // array
      return computed({
        get() {
          return (mgr.fieldTempStatusStr.value[key] as Array<string>)[index];
        },
        set(statusStr) {
          (mgr.fieldTempStatusStr.value[key] as Array<string>)[index] =
            statusStr;
        },
      });
    } else {
      // primitive
      return computed({
        get() {
          return mgr.fieldTempStatusStr.value[key];
        },
        set(statusStr) {
          mgr.fieldTempStatusStr.value[key] = statusStr;
        },
      });
    }
  }

  /**
   * 初步驗證成功後，嘗試上傳的呼叫函數
   * @param key 欄位名稱
   */
  niceInput<K extends PrimitiveKeys<Profile>>(key: K): void;
  /**
   * 初步驗證成功後，嘗試上傳的呼叫函數
   * @param key 欄位名稱
   * @param index 陣列欄位的第幾個
   */
  niceInput<K extends ArrayKeys<Profile>>(key: K, index: number): void;
  niceInput<K extends keyof Profile>(key: K, index?: number) {
    // supports array and primitives only
    if (
      (this.nextUpload[key] === undefined ||
        Array.isArray(this.nextUpload[key])) &&
      typeof index === "number"
    ) {
      // array
      // @ts-ignore
      (this.nextUpload[key] as Profile[ArrayKeys<Profile>]) = this.updatedArray(
        (this.nextUpload[key] as Profile[ArrayKeys<Profile>] | undefined) ??
          (this.copiedProfile.value[key] as Profile[ArrayKeys<Profile>]),
        index,
        this.copiedProfile.value[key][index]
      );
      this.nextLoadings.push(
        reactive({
          status: this.vmodelStatus(key as ArrayKeys<Profile>, index),
          statusStr: this.vmodelStatusStr(key as ArrayKeys<Profile>, index),
          tempStatusStr: this.vmodelTempStatusStr(
            key as ArrayKeys<Profile>,
            index
          ),
        })
      );
    } else {
      // primitive
      this.nextUpload[key] = this.copiedProfile.value[key];
      this.nextLoadings.push(
        reactive({
          status: this.vmodelStatus(key as PrimitiveKeys<Profile>),
          statusStr: this.vmodelStatusStr(key as PrimitiveKeys<Profile>),
          tempStatusStr: this.vmodelTempStatusStr(
            key as PrimitiveKeys<Profile>
          ),
        })
      );
    }
  }
}

const profileRef = storeToRefs(useUserStore());
const fieldsMgr = new FieldsManager({
  storeProfile: profileRef.openTag,
});

const share = () => {
  if (navigator.share) {
    navigator
      .share({
        url: `https://opennccu.com/u/${fieldsMgr.vmodel("customize_id").value}`,
      })
      .catch((error) => console.log("發生錯誤", error));
  } else {
    window.open(
      `https://opennccu.com/u/${fieldsMgr.vmodel("customize_id").value}`
    );
  }
};
</script>

<template>
  <div class="mb-[5vh]">
    <UserPlatformDataSlot
      title="Opentag"
      v-model="fieldsMgr.vmodel('customize_id').value"
      placeholder="像 Instagram 一樣取個 ID 吧！"
      v-model:status="fieldsMgr.vmodelStatus('customize_id').value"
      v-model:status-str="fieldsMgr.vmodelStatusStr('customize_id').value"
      v-model:temp-status-str="
        fieldsMgr.vmodelTempStatusStr('customize_id').value
      "
      :valid="() => ({ valid: true })"
      @nice-input="() => fieldsMgr.niceInput('customize_id')"
      icon-name="icon-park-outline:quadrangular-pyramid"
    />
    <span class="mx-8 mt-3 text-xs text-base-100"
      >前往您的個人頁面：<a
        class="underline"
        :href="`https://opennccu.com/u/${
          fieldsMgr.vmodel('customize_id').value
        }`"
        >https://opennccu.com/u/{{ fieldsMgr.vmodel("customize_id").value }}</a
      ><Icon
        name="majesticons:open-line"
        class="h-6 w-6 cursor-pointer px-1"
        @click="share"
    /></span>
    <UserPlatformDataSlot
      title="平台暱稱"
      v-model="fieldsMgr.vmodel('nickname').value"
      placeholder="政大金城武"
      v-model:status="fieldsMgr.vmodelStatus('nickname').value"
      v-model:status-str="fieldsMgr.vmodelStatusStr('nickname').value"
      :valid="
        () => {
          return { valid: true };
        }
      "
      @nice-input="(value) => fieldsMgr.niceInput('nickname')"
      icon-name="icon-park-outline:quadrangular-pyramid"
    />
    <!-- <UserPlatformDataUploadAvatarSlot
      title="個人頭像上傳"
      v-model="fieldsMgr.vmodel('avatar').value"
      :valid="
        () => {
          return { valid: true };
        }
      "
      @nice-input="(value) => fieldsMgr.niceInput('avatar')"
      icon-name="icon-park-outline:quadrangular-pyramid"
    /> -->
    <UserPlatformDataBioSlot
      title="自我介紹"
      v-model="fieldsMgr.vmodel('bio').value"
      placeholder="稍微介紹一下自己吧！"
      v-model:status="fieldsMgr.vmodelStatus('bio').value"
      v-model:status-str="fieldsMgr.vmodelStatusStr('bio').value"
      :valid="
        () => {
          return { valid: true };
        }
      "
      @nice-input="(value) => fieldsMgr.niceInput('bio')"
      icon-name="icon-park-outline:add-text"
    />
    <UserPlatformDataUrlSlot
      v-for="urlId of Array(SHARE_URL_LIMIT).keys()"
      :key="urlId"
      v-model="fieldsMgr.vmodel('share_urls', urlId).value"
      v-model:status="fieldsMgr.vmodelStatus('share_urls', urlId).value"
      v-model:status-str="fieldsMgr.vmodelStatusStr('share_urls', urlId).value"
      v-model:temp-status-str="
        fieldsMgr.vmodelTempStatusStr('share_urls', urlId).value
      "
      :is-public-link="true"
      @nice-input="() => fieldsMgr.niceInput('share_urls', urlId)"
    />
    <span class="mx-8 mt-3 text-xs text-base-100"
      >儲存後，將在您的個人頁面持續顯示</span
    >
  </div>
</template>
