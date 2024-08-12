type Diff<T> = {
  [K in keyof T]?: T[K]
}

export function getDifferences<T>(obj1: T, obj2: T): Diff<T> {
  const differences: Diff<T> = {}

  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      differences[key] = obj2[key]
    }
  }

  return differences
}
