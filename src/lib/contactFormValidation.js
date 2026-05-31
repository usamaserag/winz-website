const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

/**
 * @param {Record<string, string>} values
 * @param {(key: string) => string} [t] - i18n translate function for contact namespace
 * @returns {Record<string, string>}
 */
export function validateContactForm(values, t) {
  const msg = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);

  const errors = {};

  const name = (values.fullName || '').trim();
  if (!name) {
    errors.fullName = msg('form.validation.fullNameRequired', 'Full name is required.');
  } else if (name.length < 2) {
    errors.fullName = msg('form.validation.fullNameMin', 'Please enter at least 2 characters.');
  }

  const email = (values.email || '').trim();
  if (!email) {
    errors.email = msg('form.validation.emailRequired', 'Email address is required.');
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = msg('form.validation.emailInvalid', 'Please enter a valid email address.');
  }

  const phone = (values.phone || '').trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = msg('form.validation.phoneInvalid', 'Please enter a valid phone number.');
  }

  const subject = (values.subject || '').trim();
  if (!subject) {
    errors.subject = msg('form.validation.subjectRequired', 'Subject is required.');
  } else if (subject.length < 3) {
    errors.subject = msg('form.validation.subjectMin', 'Subject must be at least 3 characters.');
  }

  const message = (values.message || '').trim();
  if (!message) {
    errors.message = msg('form.validation.messageRequired', 'Message is required.');
  } else if (message.length < 10) {
    errors.message = msg('form.validation.messageMin', 'Message must be at least 10 characters.');
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
