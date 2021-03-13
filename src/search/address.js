
const ADDR_REGEX = /^(.*?)\s*(\d+.*)?$/;

export const parseAddress = text => {
  if (!text) {
    return { street: '', apartment: '' };
  }

  const match = text.match(ADDR_REGEX);
  return { street: match[1] || '', apartment: match[2] || '' };
};