const LogisticsGridPattern = ({ variant = 'dark', className = '' }) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_85%_70%_at_50%_0%,#000_50%,transparent_100%)]'
            : 'bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_65%,transparent_100%)] opacity-60'
        }`}
      />
      {!isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-slate-50" />
      )}
    </div>
  );
};

export default LogisticsGridPattern;
