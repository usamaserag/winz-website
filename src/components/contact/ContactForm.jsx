import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import {
  INITIAL_CONTACT_FORM,
  validateContactForm,
} from '../../lib/contactFormValidation';
import { fadeUp } from '../logistics/motionVariants';

const fieldClass = (hasError) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-navy-900 text-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${
    hasError ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'
  }`;

const ContactForm = () => {
  const { t } = useTranslation('contact');
  const [values, setValues] = useState(INITIAL_CONTACT_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const updateField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (status === 'error' || status === 'success') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus('success');
    setValues(INITIAL_CONTACT_FORM);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-navy-900 mb-2">{t('form.heading')}</h2>
      <p className="text-slate-600 text-sm mb-8">{t('form.subheading')}</p>

      {status === 'success' && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{t('form.success')}</p>
        </div>
      )}

      {status === 'error' && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{t('form.errorSummary')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-navy-900 mb-1.5">
              {t('form.name')} <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder={t('form.namePlaceholder')}
              className={fieldClass(errors.fullName)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-1.5">
              {t('form.email')} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder={t('form.emailPlaceholder')}
              className={fieldClass(errors.email)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy-900 mb-1.5">
              {t('form.phone')}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder={t('form.phonePlaceholder')}
              className={fieldClass(errors.phone)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-navy-900 mb-1.5">
              {t('form.company')}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder={t('form.companyPlaceholder')}
              className={fieldClass(false)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-navy-900 mb-1.5">
            {t('form.subject')} <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            placeholder={t('form.subjectPlaceholder')}
            className={fieldClass(errors.subject)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-1.5">
            {t('form.message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder={t('form.messagePlaceholder')}
            className={`${fieldClass(errors.message)} resize-y min-h-[120px]`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              {t('form.submitting')}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              {t('form.submit')}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
