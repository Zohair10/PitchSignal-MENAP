export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="shrink-0">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#f97316"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="2.5" fill="url(#logo-grad)"/>
        <path d="M16 7 A9 9 0 0 1 25 16" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9"/>
        <path d="M16 3 A13 13 0 0 1 29 16" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M16 11 A5 5 0 0 1 21 16" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
      PitchSignal
    </span>
  );
}
