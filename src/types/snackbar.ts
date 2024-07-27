export interface SnackbarInterface {
  open: boolean
  message: string
  color: 'success' | 'error'
  timeout: number
}
