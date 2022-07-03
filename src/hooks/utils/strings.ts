export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function formatDate(date: string): string {
  return date.replace('T', ' ').replace('.000Z', '');
}
