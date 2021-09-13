export function dataTimeFormat (value: string) {
  const date = Date.parse(value);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric"
  };

  return new Intl.DateTimeFormat("ru", options).format(date);
}
