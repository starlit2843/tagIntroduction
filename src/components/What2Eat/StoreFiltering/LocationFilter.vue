<template>
  <!-- Dropdown handler -->
  <div
    @click="() => (isLocationDown = !isLocationDown)"
    class="dropdown-trigger dropdown-trigger-shadow"
    :class="[
      selectedLocations.length != 0 ? 'text-course-primary' : 'text-info',
    ]"
  >
    <Icon name="grommet-icons:location" class="text-2xl" />
    <div class="w-full text-sm font-bold">區域</div>
    <div class="text-info">
      <Icon v-if="isLocationDown" name="pepicons-pencil:triangle-up-filled" />
      <Icon v-else name="pepicons-pencil:triangle-down-filled" />
    </div>
  </div>

  <!-- Dropdown content -->
  <div v-if="isLocationDown">
    <div class="m-auto w-11/12 space-y-4">
      <!-- General front door selection -->
      <div>
        <!-- TODO: edit checked value to only frontdoor -->
        <label for="front" class="relative w-full pl-8 font-medium">
          <input
            type="checkbox"
            id="front"
            :checked="Object.values(locationSelection).every((v) => v)"
            @change="(e) => handleAllSelectionChange(e)"
            class="peer/location hidden"
          />
          <span class="button" />
          政大前門
        </label>
      </div>

      <!-- Front door map -->
      <div class="relative m-auto w-max">
        <What2EatStoreFilteringFrontDoorMap :selection="locationSelection" />
      </div>

      <div class="h-px w-full bg-info/50" />

      <!-- Front door detail selection -->
      <div class="grid grid-cols-2 px-8">
        <div v-for="location in frontdoorLocations">
          <label
            :for="location.id"
            class="relative col-span-1 w-full pl-8 text-sm font-medium"
          >
            <input
              type="checkbox"
              :id="location.id"
              :checked="locationSelection[location.id as What2EatFrontdoorLocationSelection]"
              @change="(e) => handleLocationChange(location.id as What2EatLocationSelection, e)"
              class="peer/location hidden"
            />
            <span class="button" />
            {{ location.label }}
          </label>
        </div>
      </div>

      <div class="h-px w-full bg-info/50" />

      <div>
        <div v-for="location in otherLocations">
          <label :for="location.id" class="relative w-full pl-8 font-medium">
            <input
              type="checkbox"
              :id="location.id"
              :checked="locationSelection[location.id as What2EatFrontdoorLocationSelection]"
              @change="(e) => handleLocationChange(location.id as What2EatLocationSelection, e)"
              class="peer/location hidden"
            />
            <span class="button" />
            {{ location.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedLocations: What2EatLocationSelection[];
}>();

const emit = defineEmits<{
  locationChange: [
    selection: {
      left: boolean;
      right: boolean;
      fortyFive: boolean;
      pun: boolean;
      shinKong: boolean;
      backdoor: boolean;
      bridge: boolean;
    }
  ];
}>();

const frontdoorLocations = [
  { id: "left", label: "校門左側" },
  { id: "right", label: "校門右側" },
  { id: "fortyFive", label: "45 巷" },
  { id: "pun", label: "ㄆㄨㄣ街" },
  { id: "shinKong", label: "新光路" },
  { id: "other", label: "其他" },
];
const otherLocations = [
  { id: "backdoor", label: "政大後門" },
  { id: "bridge", label: "過橋" },
];

const isLocationDown = ref(false);
const locationSelection = reactive({
  left: false,
  right: false,
  fortyFive: false,
  pun: false,
  shinKong: false,
  other: false,
  backdoor: false,
  bridge: false,
});

const handleAllSelectionChange = (e: Event) => {
  const checked = (e.currentTarget as HTMLInputElement).checked;
  frontdoorLocations.forEach((loc) => {
    locationSelection[loc.id as What2EatFrontdoorLocationSelection] = checked;
  });
  emit("locationChange", locationSelection);
};

const handleLocationChange = (id: What2EatLocationSelection, e: Event) => {
  const checked = (e.currentTarget as HTMLInputElement).checked;
  locationSelection[id] = checked;
  emit("locationChange", locationSelection);
};
</script>

<style scoped>
.dropdown-trigger {
  @apply flex place-items-center space-x-2 rounded-lg bg-base px-4 py-2;
}

.dropdown-trigger-shadow {
  @apply shadow-[7px_6px_7px_-6px_rgba(0,0,0,0.11),6px_6px_18px_-14px_#878787,-5px_-5px_15px_0_#fcfcfc];
}

.button {
  @apply absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-md shadow-[inset_2.7px_1px_3.73px_0_rgba(0,0,0,0.11),inset_3.2px_3.2px_9.6px_0_rgba(135,135,135,0.1),inset_-2.7px_-2.7px_8px_0_#fcfcfc]
  peer-checked/location:bg-course-primary  
  peer-checked/location:shadow-[0.59px_0.59px_1.75px_-0.6px_rgba(72,72,72,0.25),inset_1.6px_1px_2.1px_0_rgba(255,255,255,0.4),-0.5px_-0.5px_2px_0.5px_rgba(107,210,254,0.3),0_-0.4px_1.7px_-0.86px_rgba(0,0,0,0.5)];
}
</style>
