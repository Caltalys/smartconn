export function formatDate(dateString: string | null | undefined, locale: string): string {
  if (!dateString) {
    return 'No date';
  }
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}