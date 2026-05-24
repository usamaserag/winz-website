const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

/**
 * @param {Record<string, string>} values
 * @returns {Record<string, string>}
 */
export function validateContactForm(values) {
  const errors = {};

  const name = (values.fullName || '').trim();
  if (!name) {
    errors.fullName = 'Full name is required.';
  } else if (name.length < 2) {
    errors.fullName = 'Please enter at least 2 characters.';
  }

  const email = (values.email || '').trim();
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = (values.phone || '').trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  const subject = (values.subject || '').trim();
  if (!subject) {
    errors.subject = 'Subject is required.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  const message = (values.message || '').trim();
  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

export const INITIAL_CONTACT_FORM = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
};
