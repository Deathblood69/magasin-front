export default defineNuxtPlugin(() => {
  const $customFetch = $fetch.create({
    baseURL: '/api'
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch
    }
  }
})
