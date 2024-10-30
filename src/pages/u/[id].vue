<template>
  <div class="h-real mx-auto flex max-w-lg grow flex-col overflow-auto">
    <div
      class="flex h-full flex-col gap-[10vh] overflow-y-scroll bg-[url(~/assets/images/UserPageBackground.png)] px-9 py-[5vh]"
    >
      <div class="flex w-full flex-row items-center justify-center">
        <img src="@/assets/images/LogoWithTitle.png" />
      </div>
      <div class="flex flex-col gap-10">
        <OpenTagProfile
          :nickname="profile.nickname"
          :customize_id="profile.customize_id"
          :badges="profile.badges"
          :bio="profile.bio"
        />
        <OpenTagUrls
          :share_urls="profile.share_urls"
          :timed_urls="profile.timed_urls"
          :timed_urls_deadtime="profile.timed_urls_deadtime"
        />
        <!-- <OpenTagEatCollection /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const profile = (await useProfile(id)) ?? null;
if (!profile) {
  router.push("/404");
}

definePageMeta({
  layout: false,
});
</script>
