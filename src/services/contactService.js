import { getResponseMessage } from '../lib/apiMessage';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://api.winz.be'
).replace(/\/$/, '');

const CONTACT_US_URL = `${API_BASE_URL}/api/contact-us/`;

async function parseResponseBody(response) {
  const text = await response.text();
  if (!text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { message: text.trim() };
  }
}

/**
 * @param {unknown} data
 * @param {number} status
 */
function getErrorMessage(data, status) {
  const fromBody = getResponseMessage(data, '');
  if (fromBody) return fromBody;
  return `Request failed (${status})`;
}

/**
 * @param {Record<string, string>} values
 * @param {AbortSignal} [signal]
 * @returns {Promise<{ data: unknown, message: string }>}
 */
export const submitContactForm = async (values, signal) => {
  const formData = new FormData();
  formData.append('full_name', (values.fullName || '').trim());
  formData.append('email', (values.email || '').trim());
  formData.append('phone_number', (values.phone || '').trim());
  formData.append('company_name', (values.company || '').trim());
  formData.append('subject', (values.subject || '').trim());
  formData.append('message', (values.message || '').trim());

  const response = await fetch(CONTACT_US_URL, {
    method: 'POST',
    body: formData,
    signal,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  const message = getResponseMessage(data, '');
  return { data, message };
};
