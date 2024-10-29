<template>
  <SheetBottomSheet
    :open="_open"
    :title="'上傳政大全人資料'"
    title-type="close"
  >
    <template #button>
      <slot name="button" :handleOpen="handleOpen"></slot>
    </template>
    <template #modal>
      <div class="flex h-full flex-col space-y-2">
        <!-- body -->
        <div class="flex cursor-pointer place-items-center justify-center pt-8">
          <label for="updateJson">
            <input
              ref="file"
              type="file"
              id="updateJson"
              class="hidden"
              accept="application/json"
              @change="handleFileChange"
            />
            <div class="m-auto w-1/4 space-y-4">
              <img src="~/assets/images/Upload.png" alt="" />
              <div class="text-center">點擊上傳</div>
            </div>
          </label>
        </div>
        <!-- footer -->
        <div class="flex place-items-start justify-center pt-4">
          <label for="intro" class="flex">
            <button id="intro" @click="" class="h-0" />
            <a
              class="cursor-pointer text-base-100 underline-offset-4 hover:underline"
              href="https://moltke.nccu.edu.tw/selfDevelop_SSO/exportStudentData.jsp"
              target="_blank"
            >
              {{ footerContext() }}
            </a>
          </label>
        </div>
      </div>
    </template>
  </SheetBottomSheet>
</template>

<script setup lang="ts">
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
const reader = new FileReader();

reader.onload = async () => {
  const fileContent = JSON.parse(reader.result as string);
  await useJson({
    data: fileContent,
  }).then(() => {
    emits("dataUpdated");
    handleClose();
  });
};

const handleFileChange = () => {
  if (file.value) {
    reader.readAsText((file.value as HTMLInputElement).files![0]);
  }
};

const handleOpen = () => {
  _open.value = true;
};

const handleClose = () => {
  _open.value = false;
};

watch(
  () => props.open,
  (open) => (_open.value = open)
);

const footerContext = () => {
  switch (props.route) {
    case "gpa":
      return "前往政大全人系統下載「課業學習」資料";
    default:
      return "前往政大全人系統下載資料";
  }
};
</script>
