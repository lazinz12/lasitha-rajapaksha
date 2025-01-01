export const generateSlug = (title: string): string => {
  const timestamp = Date.now();
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}`;
};