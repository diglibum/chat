export function prepareDataToRequest(formData: FormData) {
  const data: Record<string, string | File> = {};
  for (const pair of formData?.entries()) {
    data[pair[0]] = pair[1];
  }
  return data;
}
