/** Business contact details (footer, contact page, WhatsApp). */
export const CONTACT_PHONE = {
  display: '+32 496 32 24 67',
  /** Digits only, no + or spaces — for wa.me / tel links */
  e164: '32496322467',
};

export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.e164}`;
