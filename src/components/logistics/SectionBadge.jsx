const SectionBadge = ({ label, variant = 'light' }) => {
  const styles =
    variant === 'dark'
      ? 'bg-primary-500/15 text-primary-200 border-primary-400/30'
      : 'bg-primary-50 text-primary-700 border-primary-200';

  return (
    <span
      className={`inline-block py-1 px-4 rounded-full border text-sm font-semibold tracking-wide mb-4 ${styles}`}
    >
      {label}
    </span>
  );
};

export default SectionBadge;
