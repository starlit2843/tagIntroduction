<template>
  <div
    class="flex place-items-center space-x-2 py-4 font-semibold min-[380px]:py-8"
  >
    <button @click="() => router.back()" class="flex place-items-center">
      <Icon name="ep:arrow-left-bold" />
    </button>
    <div class="h-max text-lg">所有清單</div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
