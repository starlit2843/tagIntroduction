export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch(
      "https://script.google.com/macros/s/AKfycbzsk_lgB9dvTeOVZ4013zuZtCYV568R0KXOgJ7pqd_3F09hO44Sc3usUL5PnDPzmwUY/exec"
    );

    return response as What2EatShopType[];
  } catch (error: any) {
    console.log(error);
    sendError(event, error, true);
  }
});
