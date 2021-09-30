
export function toCamelCase (key: string) {
  function upperToHyphenLower (_str: string, val: string) {
    return val.toUpperCase();
  }
  return (key.replace(/[_-]+(\w)/g, upperToHyphenLower));
}
