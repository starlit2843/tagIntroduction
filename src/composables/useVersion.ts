export const useVersion = () => {
  const runtimeConfig = useRuntimeConfig();

  const version = computed(() => runtimeConfig.public.version as string);

  return { version };
};
