<template>
  <What2EatStoreFilteringPriceFilter
    :selected-prices="selectedPrices"
    @price-change="(selections) => $emit(
      'selectedPricesChange',
      Object.entries(selections)
        .filter(([_, value]) => value)
        .map(([key, _]) => key as What2EatPriceSelection)
    )"
  />

  <What2EatStoreFilteringTimeFilter
    :selected-time="selectedTime"
    @time-change="(id) => $emit('selectedTimeChange', id)"
  />

  <What2EatStoreFilteringLocationFilter
    :selected-locations="selectedLocations"
    @location-change="(selections) => $emit(
      'selectedLocationsChange',
      Object.entries(selections)
        .filter(([_, value]) => value)
        .map(([key, _]) => key as What2EatLocationSelection)
    )"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedPrices: What2EatPriceSelection[];
  selectedTime: What2EatTimeSelection;
  selectedLocations: What2EatLocationSelection[];
}>();

const emit = defineEmits<{
  selectedPricesChange: [selections: What2EatPriceSelection[]];
  selectedTimeChange: [selectedTimeId: What2EatTimeSelection];
  selectedLocationsChange: [selections: What2EatLocationSelection[]];
}>();
</script>

<style scoped></style>
