export function dataTimeFormat(value: string, withDate: boolean = false) {
  const date = Date.parse(value);
  let options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  if (withDate) {
    options = {
      ...options,
      month: "numeric",
      day: "numeric",
    };
  }

  return new Intl.DateTimeFormat("ru", options).format(date);
}
