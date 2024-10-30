<template>
  <div
    @click="isTimeDown = !isTimeDown"
    class="dropdown-trigger dropdown-trigger-shadow"
  >
    <Icon name="svg-spinners:clock" class="text-2xl text-course-primary" />
    <div class="w-full text-sm font-bold text-course-primary">用餐時段</div>
    <div>
      <Icon v-if="isTimeDown" name="pepicons-pencil:triangle-up-filled" />
      <Icon v-else name="pepicons-pencil:triangle-down-filled" />
    </div>
  </div>
  <div v-if="isTimeDown">
    <div class="m-auto w-4/5">
      <div class="space-x-4">
        <label
          for="currentTime"
          @click="emit('timeChange', 'currentTime')"
          class="relative w-full pl-8 text-sm font-medium"
        >
          <input
            type="radio"
            name="filterTime"
            id="currentTime"
            :checked="selectedTime == 'currentTime'"
            class="peer/time hidden"
          />
          <span class="radio-button" />
          現在時間
        </label>
      </div>
      <div class="my-2 h-px w-full bg-info" />
      <div v-for="time in timeFilter">
        <div>
          <label
            :for="time.id"
            @click="emit('timeChange', time.id as What2EatTimeSelection)"
            class="relative w-full pl-8 text-sm font-medium"
          >
            <input
              type="radio"
              name="filterTime"
              :id="time.id"
              :checked="selectedTime == time.id"
              class="peer/time hidden"
            />
            <span class="radio-button" />
            {{ time.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedTime: What2EatTimeSelection;
}>();

const emit = defineEmits<{
  timeChange: [id: What2EatTimeSelection];
}>();

const timeFilter = [
  { id: "-12", label: "before 1200" },
  { id: "12-14", label: "1200-1400" },
  { id: "14-18", label: "1400-1800" },
  { id: "18-21", label: "1800-2100" },
];

const isTimeDown = ref(false);
</script>

<style scoped>
.dropdown-trigger {
  @apply flex place-items-center space-x-2 rounded-lg bg-base px-4 py-2 text-info;
}

.dropdown-trigger-shadow {
  @apply shadow-[7px_6px_7px_-6px_rgba(0,0,0,0.11),6px_6px_18px_-14px_#878787,-5px_-5px_15px_0_#fcfcfc];
}

.radio-button {
  @apply absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-md shadow-[inset_2.7px_1px_3.73px_0_rgba(0,0,0,0.11),inset_3.2px_3.2px_9.6px_0_rgba(135,135,135,0.1),inset_-2.7px_-2.7px_8px_0_#fcfcfc]
  peer-checked/time:bg-course-primary  
  peer-checked/time:shadow-[0.59px_0.59px_1.75px_-0.6px_rgba(72,72,72,0.25),inset_1.6px_1px_2.1px_0_rgba(255,255,255,0.4),-0.5px_-0.5px_2px_0.5px_rgba(107,210,254,0.3),0_-0.4px_1.7px_-0.86px_rgba(0,0,0,0.5)];
}
</style>
