export const firstQueryParameter = (
  p: string | string[] | undefined | null,
): string | undefined | null => (Array.isArray(p) ? p[0] : p)
