export interface MenuItem {
  title: string
  action: () => void
  icon?: string
  disable?: boolean
}
