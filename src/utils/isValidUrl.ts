export const isValidUrl = (url?: string) => {
  if (typeof url !== 'string') {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    return /(?:www\.)?instagram\.com$/.test(parsedUrl.hostname);
  } catch (error) {
    return false;
  }
};
