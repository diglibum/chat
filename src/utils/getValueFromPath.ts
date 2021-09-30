export function getValueFromPath (obj: Record<string, any>, path: string): any {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    result = result[key];
  }

  return result;
}
