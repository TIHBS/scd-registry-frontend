export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return (
      str.substring(0, maxLength) +
      "..." +
      str.substring(str.length - 4, str.length)
    );
  }
  return str;
}
