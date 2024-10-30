<template>
  <div
    class="h-auto overflow-hidden rounded-lg p-2 pb-0 text-center text-sm shadow-numo-light-inset"
  >
    <div class="flex h-full overflow-hidden rounded-md">
      <div class="datagrid-container grow overflow-y-scroll">
        <div
          class="border-secondary sticky top-0 z-10 grid grid-cols-6 border-b-4 bg-base py-2.5"
        >
          <div>學年度</div>
          <div class="col-span-2">課堂名稱</div>
          <div>GPA</div>
          <div>成績</div>
          <div>學分數</div>
        </div>
        <div class="relative z-0">
          <GpaCourseData
            v-for="(course, index) in props.courseDataList"
            :course="course"
            :index:="index"
            :colored="handleId()"
          >
            {{ props.courseGpaList!.at(index) }}
          </GpaCourseData>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  courseDataList: Array<Object>,
  courseGpaList: Array<String>,
});

let colored = true;

function handleId(): boolean {
  colored = !colored;
  return colored;
}
</script>

<style scoped>
.datagrid-container > div:last-child {
  @apply border-b-2 border-info;
}

.datagrid-container::after {
  @apply flex w-full justify-center p-3.5 text-sm font-bold text-info;
  content: "告訴你，我也是有底線的";
}
</style>
