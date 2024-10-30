export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy) as T;
  }

  const newObj = {};
  for (const key in obj) {
    // @ts-ignore
    newObj[key] = deepCopy(obj[key]);
  }
  return newObj as T;
}
