export const generateSlug = (title: string, timestamp?: number): string => {
  const suffix = timestamp || Date.now();
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${suffix}`;
};