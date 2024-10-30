<template>
  <BottomSwipePanel
    :open="_open"
    @handleClose="handleClose"
    :title="'個人頭像上傳'"
  >
    <template v-slot:button>
      <slot name="button" :handleOpen="handleOpen"></slot>
    </template>
    <template v-slot:modal>
      <div class="flex h-full flex-col space-y-2">
        <!-- body -->
        <div
          class="flex-1 grow cursor-pointer place-items-center justify-center pt-8"
        >
          <label for="updateAvatar">
            <input
              ref="file"
              type="file"
              id="updateAvatar"
              class="hidden"
              accept=".jpg, .png, .heic"
              @change="handleFileChange"
            />
            <div class="m-auto w-1/4 space-y-4">
              <img src="~/assets/images/Upload.png" alt="" />
              <div class="text-center">點擊上傳</div>
            </div>
          </label>
        </div>
        <!-- footer -->
        <div
          class="flex grow place-items-start justify-center pt-4 text-base-100 underline-offset-4"
          target="_blank"
        >
          （僅支援 JPG, PNG, HEIC。檔案需小於1MB）
        </div>
      </div>
    </template>
  </BottomSwipePanel>
</template>

<script setup lang="ts">
import { useAvatarStore } from "~/stores/avatar";
const { uploadAvatar } = useAvatarStore();
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  route: {
    type: String,
    default: "general",
  },
});

const emits = defineEmits(["dataUpdated"]);

const file = ref(null);
const _open = ref(props.open);
const base64String = ref();

const handleFileChange = async (event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files[0]) {
    const selectedFile = inputElement.files[0];
    // 檢查檔案大小
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      alert(`檔案需小於 ${maxSizeInMB}MB`);
      return;
    }

    if (selectedFile) {
      const reader = new FileReader();

      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        base64String.value = e?.target?.result;

        uploadAvatar(base64String.value)
          .then(() => {
            console.log("uploaded");
            handleClose();
          })
          .catch((e) => {
            console.log(e);
          });
      };
    }
  }
};

const handleOpen = () => {
  _open.value = true;
};

const handleClose = () => {
  _open.value = false;
};
</script>
