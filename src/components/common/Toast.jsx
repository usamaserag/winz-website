import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    container: 'border-green-300 bg-green-600 text-white shadow-lg shadow-green-900/25',
    iconClass: 'text-white',
  },
  error: {
    icon: AlertCircle,
    container: 'border-red-300 bg-red-600 text-white shadow-lg shadow-red-900/25',
    iconClass: 'text-white',
  },
};

/**
 * @param {{ message: string, type?: 'success' | 'error', onClose: () => void, duration?: number }} props
 */
const Toast = ({ message, type = 'success', onClose, duration = 6000 }) => {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);
  const variant = VARIANTS[type] || VARIANTS.success;
  const Icon = variant.icon;

  useEffect(() => {
    const showTimer = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(showTimer);
  }, []);

  useEffect(() => {
    if (!duration) return undefined;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, message]);

  return (
    <div
      className={`fixed top-6 left-1/2 z-[9999] w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="assertive"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${variant.container}`}
      >
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${variant.iconClass}`} aria-hidden="true" />
        <p className="flex-1 text-sm font-medium leading-relaxed pe-1">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded p-1 text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={t('a11y.dismissNotification')}
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
