export const useCourseDetail = async (courseId: any) => {
  const { $firebaseAuth } = useNuxtApp();
  const user = $firebaseAuth.currentUser;
  if (!user) return;
  const idToken = await user.getIdToken();

  return $fetch(`/api/course/detail?courseId=${courseId}`, {
    headers: { authorization: "Bearer " + idToken },
    method: "get",
  });
};
