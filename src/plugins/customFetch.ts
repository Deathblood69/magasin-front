export default defineNuxtPlugin(() => {
  const $customFetch = $fetch.create({})
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch
    }
  }
})
