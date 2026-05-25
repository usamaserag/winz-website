/**
 * Extract a user-facing message from common API response shapes.
 * @param {unknown} data
 * @param {string} [fallback]
 * @returns {string}
 */
export function getResponseMessage(data, fallback = '') {
  if (data == null) return fallback;

  if (typeof data === 'string' && data.trim()) {
    return data.trim();
  }

  if (typeof data !== 'object') {
    return fallback;
  }

  const candidates = [data.message, data.detail, data.msg, data.error];
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  const nested = data.data;
  if (nested && typeof nested === 'object') {
    const nestedMsg = getResponseMessage(nested, '');
    if (nestedMsg) return nestedMsg;
  }

  return fallback;
}
