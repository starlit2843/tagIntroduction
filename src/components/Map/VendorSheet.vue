<template>
  <SheetBottomSheet
    :open="open"
    @handleClose="open = false"
    :title="
      vendor === null
        ? ''
        : vendor.number.includes('stage')
        ? vendor.title
        : vendor.number + ' ' + vendor.title
    "
    titleType="close"
    extendable
  >
    <template v-slot:modal>
      <div v-if="vendor && hasData" class="max-w-lg overflow-x-hidden">
        <div v-if="vendor.number.includes('stage')" class="max-h-96">
          <div class="mx-6 flex flex-col">
            <div class="flex items-center gap-2">
              <Icon
                class="h-5 w-5"
                name="icon-park-outline:quadrangular-pyramid"
              />
              <span class="text-2xl">活動簡介</span>
            </div>
            <div class="mx-6 flex flex-col gap-3">
              <span class="text-md line-clamp-4 mx-2 my-2 text-info">
                {{ vendor.introduction }}
              </span>
              <NuxtLink
                v-if="vendor.link"
                :to="vendor.link"
                target="_blank"
                class="flex flex-row justify-between rounded-30 px-4 py-2 shadow-numo-card"
              >
                <div class="flex flex-row gap-2">
                  <Icon class="h-5 w-5" name="ant-design:link-outlined" />
                  <span class="text-info">{{ vendor.link }}</span>
                </div>
                <Icon class="h-5 w-5" name="material-symbols:open-in-new" />
              </NuxtLink>
            </div>
          </div>
          <div v-if="dayList.length > 0" class="mx-6 my-8 flex flex-col">
            <div class="mb-3 flex items-center gap-2">
              <Icon
                class="h-5 w-5"
                name="icon-park-outline:quadrangular-pyramid"
              />
              <span class="text-2xl">節目表</span>
            </div>
            <div
              v-if="dayList.length > 1"
              class="relative m-2 flex h-12 w-1/2 cursor-default place-self-end rounded-xl text-center text-info shadow-numo-light-inset"
            >
              <div
                class="transition-right absolute z-10 h-full w-1/3 rounded-xl p-2 duration-300"
                :class="leftPosition"
              >
                <div
                  class="flex h-full w-full justify-center rounded-xl shadow-numo-light"
                />
              </div>
              <div
                v-for="[index, day] of dayList.entries()"
                :key="index"
                class="bg-tranparent z-20 flex h-full items-center justify-center"
                :class="widthPropotion"
                @click="date = day"
              >
                {{ day }}
              </div>
            </div>
            <div
              v-for="[index, program] of vendor.programList[date].entries()"
              :key="index"
              class="mx-6 flex flex-col"
            >
              <span class="text-md mx-6 my-2 text-info">
                {{ program.time }}
              </span>
              <div
                class="flex flex-row justify-between rounded-30 px-6 py-2 shadow-numo-card"
              >
                <span class="text-info">
                  {{ program.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mx-6 mt-2 flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <div v-if="vendor.introduction" class="flex items-center gap-2">
              <Icon
                class="h-5 w-5"
                name="icon-park-outline:quadrangular-pyramid"
              />
              <span class="text-2xl">店家簡介</span>
            </div>
            <span class="text-md line-clamp-4 mx-8 text-info">
              {{ vendor.introduction }}
            </span>
          </div>
          <div class="flex flex-col gap-2">
            <div v-if="vendor.link" class="flex items-center gap-2">
              <Icon
                class="h-5 w-5"
                name="icon-park-outline:quadrangular-pyramid"
              />
              <span class="text-2xl">菜單介紹</span>
            </div>
            <NuxtLink
              v-if="vendor.link"
              :to="vendor.link"
              target="_blank"
              class="mx-2 flex flex-row justify-between rounded-30 px-4 py-2 shadow-numo-card"
            >
              <div class="flex flex-row gap-2">
                <Icon class="h-5 w-5" name="ant-design:link-outlined" />
                <span class="line-clamp-1 text-info">{{ vendor.link }}</span>
              </div>
              <Icon class="h-5 w-5" name="material-symbols:open-in-new" />
            </NuxtLink>
          </div>
          <div v-if="vendor.items.length > 0" class="flex flex-col">
            <div class="mb-3 flex items-center gap-2">
              <Icon
                class="h-5 w-5"
                name="icon-park-outline:quadrangular-pyramid"
              />
              <span class="text-2xl">品項簡介</span>
            </div>
            <div
              v-for="[index, item] of vendor.items.entries()"
              :key="index"
              class="mx-6 flex flex-col"
            >
              <div
                class="flex flex-row justify-between rounded-30 px-6 py-2 shadow-numo-card"
              >
                <span class="text-info">
                  {{ item.name }}
                </span>
              </div>
              <span class="text-md mx-6 my-4 text-info">
                {{ item.introduction }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex h-72 flex-wrap content-center justify-center text-2xl font-bold text-info"
      >
        此店家未提供資訊٩(ŏ﹏ŏ、)۶
      </div>
    </template>
  </SheetBottomSheet>
</template>

<script setup lang="ts">
import { useVendorStore } from "../../stores/vendor";
const vendorStore = useVendorStore();

const props = withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  {
    open: false,
  }
);

const open = ref(props.open);

watch(
  () => props.open,
  (value) => {
    open.value = value;
  }
);

const vendor = ref(vendorStore.getSelected);
const hasData = ref(false);

const dayList: Ref<string[]> = ref([]);
const date = ref("");
watch(
  () => vendorStore.getSelected,
  (value) => {
    vendor.value = value;
    hasData.value = false;
    if (value) {
      for (const [key, v] of Object.entries(value)) {
        if (key !== "number" && key !== "title") {
          if (typeof v === "string" && v !== "") {
            hasData.value = true;
            break;
          } else if (Array.isArray(v) && v.length > 0) {
            hasData.value = true;
            break;
          }
        }
      }
    }
    if (vendor.value?.programList) {
      dayList.value = Object.keys(vendor.value.programList);
      date.value = dayList.value[0];
    }
  }
);

const widthPropotion = computed(() => {
  const length = dayList.value.length;
  return `w-1/${length}`;
});

const leftPosition = computed(() => {
  const index = dayList.value.indexOf(date.value);
  if (index === 0) return "left-0";
  else if (index === 1) return "left-1/3";
  else return "left-2/3";
});
</script>
