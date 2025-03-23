
export const generateSlug = (title: string): string => {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Add alias for backward compatibility
export const createSlug = generateSlug;
