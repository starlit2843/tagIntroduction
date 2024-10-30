export const useRegister = async (param: any) => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return;
  const idToken = await user.getIdToken();
  // const ref = doc($fiebaseFirestore, "users", "frank");

  await $fetch("/api/user/register", {
    headers: { authorization: "Bearer " + idToken },
    method: "post",
    body: param,
  });
  return param;
};

export const useDeleteUser = async () => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return;
  const idToken = await user.getIdToken();
  // const ref = doc($fiebaseFirestore, "users", "frank");

  return await $fetch("/api/user/profile", {
    headers: { authorization: "Bearer " + idToken },
    method: "delete",
  });
};

// 任一 OpenTag
export const useProfile = async (id: string) => {
  return $fetch(`/api/user/${id}`, {
    method: "get",
  });
};
