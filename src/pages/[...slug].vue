<template>
  <div class="flex h-full flex-col items-center justify-center gap-4">
    <div
      class="absolute left-0 top-0 -z-10 h-screen w-screen bg-[url(~/assets/images/UserBackground.png)]"
    ></div>
    <img src="~/assets/images/LogoWithTitle.png" />
    <img src="~/assets/404Text.png" />
    <img src="~/assets/T-Rex.png" class="w-full max-w-[200px]" />
    <p class="text-center font-bold">
      很抱歉，我們沒有找到您想要的頁面，
      <br />
      但同理心恐龍在這裡陪伴您。
    </p>
    <NuxtLink to="/" class="rounded-md p-2 shadow-numo-card">
      回到首頁
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
