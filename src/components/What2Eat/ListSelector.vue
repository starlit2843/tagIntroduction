<template>
  <div
    ref="selector"
    @scroll="(event) => handleScroll((event.currentTarget as HTMLDivElement).scrollLeft)"
    class="hide-scrollbar relative z-10 flex h-max w-full snap-x snap-mandatory snap-always place-items-center gap-x-2 overflow-x-auto"
  >
    <div
      class="selected-border-shadow fixed left-1/2 h-20 w-20 -translate-x-1/2 rounded-full"
    />
    <div class="h-1 min-w-[calc(50%-48px)]" />

    <!-- Official lists -->
    <div v-for="(collection, index) in officialLists">
      <What2EatListButton
        :index="index"
        :selected-index="selectedIndex"
        :collection="collection"
        @draw="$emit('draw')"
      />
    </div>

    <!-- All shop lists -->
    <What2EatListButton
      :index="officialLists.length"
      :selected-index="selectedIndex"
      :collection="{ id: '', cover: '' }"
      @draw="$emit('draw')"
    />

    <!-- Favorite lists -->
    <div v-for="(collection, index) in savedLists">
      <What2EatListButton
        :index="index + officialLists.length + 1"
        :selected-index="selectedIndex"
        :collection="collection"
        @draw="$emit('draw')"
      />
    </div>

    <div class="h-1 min-w-[calc(50%-48px)]" />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  selector.value.scroll({
    left: props.officialLists.length * 88,
  });
});

const props = defineProps<{
  defaultList: {
    id: string;
    cover: string;
    name: string;
  };
  officialLists: {
    id: string;
    cover: string;
    name: string;
  }[];
  savedLists: {
    id: string;
    cover: string;
    name: string;
  }[];
}>();

const emit = defineEmits<{
  selectedListChanged: [index: number];
  draw: [];
}>();

const selector = shallowRef();
const selectedIndex = ref(props.officialLists.length);

const handleScroll = (scrollLeft: number) => {
  selectedIndex.value = scrollLeft / 88;
  if (scrollLeft % 88 == 0) emit("selectedListChanged", selectedIndex.value);
};
</script>

<style scoped>
.selected-border-shadow {
  @apply shadow-[inset_-1px_-2px_4px_0_rgba(255,255,255),inset_20px_20px_20px_-22px_rgba(0,0,0,0.15)] drop-shadow-[-7px_-5px_19px_3px_rgba(255,255,255,0.9),20px_5px_20px_-8px_rgba(0,0,0,0.05)];
}

.hide-scrollbar {
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
