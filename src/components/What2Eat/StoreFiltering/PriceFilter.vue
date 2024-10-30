<template>
  <div
    @click="isPriceDown = !isPriceDown"
    class="dropdown-trigger dropdown-trigger-shadow"
    :class="[selectedPrices.length != 0 ? 'text-course-primary' : 'text-info']"
  >
    <Icon name="pepicons-pop:dollar" class="text-2xl" />
    <div class="w-full text-sm font-bold">價格區間</div>
    <div class="text-info">
      <Icon v-if="isPriceDown" name="pepicons-pencil:triangle-up-filled" />
      <Icon v-else name="pepicons-pencil:triangle-down-filled" />
    </div>
  </div>
  <div v-if="isPriceDown">
    <div class="m-auto flex w-3/4 justify-between">
      <div v-for="selection in Object.keys(priceSelections)">
        <label :for="selection">
          <input
            type="checkbox"
            :id="selection"
            :checked="priceSelections[selection as What2EatPriceSelection]"
            @change="(e) => handleSelectionChange(e, selection as What2EatPriceSelection)"
            class="peer/price hidden"
          />
          <div class="price-filter-button">
            {{ selection }}
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const priceSelections = {
  $: false,
  $$: false,
  $$$: false,
};

const props = defineProps<{
  selectedPrices: What2EatPriceSelection[];
}>();

const emit = defineEmits<{
  priceChange: [
    selections: {
      $: boolean;
      $$: boolean;
      $$$: boolean;
    }
  ];
}>();

const isPriceDown = ref(false);

const handleSelectionChange = (e: Event, selection: What2EatPriceSelection) => {
  const checked = (e.currentTarget as HTMLInputElement).checked;
  priceSelections[selection] = checked;
  emit("priceChange", priceSelections);
};
</script>

<style scoped>
.dropdown-trigger {
  @apply flex place-items-center space-x-2 rounded-lg bg-base px-4 py-2;
}

.dropdown-trigger-shadow {
  @apply shadow-[7px_6px_7px_-6px_rgba(0,0,0,0.11),6px_6px_18px_-14px_#878787,-5px_-5px_15px_0_#fcfcfc];
}

.price-filter-button {
  @apply rounded-full border-2 border-info/80 px-6 py-0.5 peer-checked/price:bg-course-primary peer-checked/price:text-numo-white peer-checked/price:shadow-[0.59px_0.59px_1.75px_-0.6px_rgba(72,72,72,0.25),inset_1.6px_1px_2.1px_0_rgba(255,255,255,0.4),-0.5px_-0.5px_2px_0.5px_rgba(107,210,254,0.3),0_-0.4px_1.7px_-0.86px_rgba(0,0,0,0.5)];
}
</style>
