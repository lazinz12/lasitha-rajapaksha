export const generateSlug = (name: string, timestamp: number = Date.now()) => {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}`;
};