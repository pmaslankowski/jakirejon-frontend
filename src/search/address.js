
const ADDR_REGEX = /([^\d\s]*)(\s+(.*))?/;

export const parseAddress = text => {
  if (!text) {
    return { street: '', apartment: '' };
  }

  const match = text.match(ADDR_REGEX);
  return { street: match[1] || '', apartment: match[3] || '' };
};