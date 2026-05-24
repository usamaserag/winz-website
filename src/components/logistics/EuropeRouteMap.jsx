/**
 * Stylized European route network — logistics map motif (not decorative orbits).
 */
const EuropeRouteMap = ({ className = '' }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    <path
      d="M120 280 C180 220 240 200 320 210 C400 220 460 180 540 190 C620 200 680 240 720 280"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="route-line text-primary-400/50"
    />
    <path
      d="M160 340 C220 300 300 290 380 300 C460 310 520 350 600 330 C660 315 700 290 740 260"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="route-line text-white/20"
      style={{ animationDelay: '2s' }}
    />
    <path
      d="M200 180 L280 160 L360 175 L440 150 L520 165 L600 140"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className="route-line text-primary-300/40"
      style={{ animationDelay: '4s' }}
    />
    <circle cx="320" cy="210" r="5" className="fill-primary-400/80" />
    <circle cx="540" cy="190" r="4" className="fill-white/50" />
    <circle cx="380" cy="300" r="4" className="fill-primary-300/70" />
    <circle cx="600" cy="330" r="3" className="fill-white/40" />
    <circle cx="440" cy="150" r="3" className="fill-primary-400/60" />
    <path
      d="M280 120 C300 100 340 95 380 110 C420 125 450 115 490 130 C530 145 560 135 590 150"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 5"
      className="text-white/15"
    />
  </svg>
);

export default EuropeRouteMap;
