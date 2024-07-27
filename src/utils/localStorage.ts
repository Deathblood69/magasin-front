/**
 * Stores a value in the local storage if the process is running on the client side.
 *
 * @param {string} key - The key to store the value under.
 * @param {any} value - The value to store.
 */
export function storeValueInLocalStorage(key: string, value: any) {
  if (process.client) {
    localStorage.setItem(key, value)
  }
}

/**
 * Retrieves the value associated with the specified key from the local storage if the process is running on the client side.
 *
 * @param {string} key - The key to retrieve the value for.
 * @returns {string | null} - The value associated with the key, or null if the key does not exist or the process is not running on the client side.
 */
export function checkLocalStorage(key: string) {
  if (process.client) {
    return localStorage.getItem(key)
  }
}
