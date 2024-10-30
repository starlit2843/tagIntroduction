<template>
  <div
    :class="isBreakfastMode ? 'gap-4' : 'gap-2'"
    class="relative grid grid-cols-3 grid-rows-4 max-[380px]:gap-3"
  >
    <div v-for="button in buttons">
      <div v-if="button == -1">
        <SouthOrNorthBreakfastNumberGridModel
          v-if="isBreakfastMode"
          :clicked-action="deleteButtonClicked"
        >
          <div
            class="my-auto flex text-[40px] text-error/50 max-[380px]:text-3xl"
          >
            <Icon name="tabler:backspace-filled" />
          </div>
        </SouthOrNorthBreakfastNumberGridModel>
        <SouthOrNorthCalculatorNumberGridModel
          v-else
          :button-type="'delete'"
          :clicked-action="deleteButtonClicked"
        />
      </div>
      <div v-else>
        <SouthOrNorthBreakfastNumberGridModel
          v-if="isBreakfastMode"
          :clicked-action="() => numberButtonClicked(button.toString())"
        >
          <div class="my-auto text-5xl font-bold max-[380px]:text-4xl">
            {{ button }}
          </div>
        </SouthOrNorthBreakfastNumberGridModel>
        <SouthOrNorthCalculatorNumberGridModel
          v-else
          :button-type="'default'"
          :clicked-action="() => numberButtonClicked(button.toString())"
        >
          <div class="my-auto text-4xl text-base-content">{{ button }}</div>
        </SouthOrNorthCalculatorNumberGridModel>
      </div>
    </div>
    <SouthOrNorthBreakfastNumberGridModel
      v-if="isBreakfastMode"
      :clicked-action="props.search"
    >
      <div class="my-auto flex text-[40px] text-error/50 max-[380px]:text-3xl">
        <Icon name="fluent:search-12-filled" />
      </div>
    </SouthOrNorthBreakfastNumberGridModel>
    <SouthOrNorthCalculatorNumberGridModel
      v-else
      :button-type="'search'"
      :clicked-action="props.search"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isBreakfastMode: boolean;
  search: () => void;
}>();

const inputValue = inject<Ref<string>>("inputValue")!;
const buttons = reactive([7, 8, 9, 4, 5, 6, 1, 2, 3, -1, 0]);

const numberButtonClicked = (buttonValue: string) => {
  if (isNaN(Number(inputValue.value))) inputValue.value = "";
  inputValue.value += buttonValue;
};

const deleteButtonClicked = () => {
  if (isNaN(Number(inputValue.value))) inputValue.value = "";
  else
    inputValue.value = inputValue.value.slice(0, inputValue.value.length - 1);
};
</script>

<style scoped></style>
