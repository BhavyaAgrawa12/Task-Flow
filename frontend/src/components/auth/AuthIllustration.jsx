function AuthIllustration() {
  return (
    <div className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden bg-bg-secondary p-8 lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple/10" />

      <svg
        viewBox="0 0 400 320"
        className="relative h-auto w-full max-w-sm"
        aria-hidden="true"
      >
        <rect x="48" y="40" width="120" height="80" rx="12" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
        <rect x="56" y="52" width="60" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="56" y="64" width="90" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="56" y="74" width="70" height="4" rx="2" fill="rgba(255,255,255,0.1)" />

        <rect x="220" y="60" width="100" height="70" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect x="230" y="72" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
        <rect x="230" y="84" width="70" height="4" rx="2" fill="rgba(255,255,255,0.08)" />

        <rect x="180" y="160" width="140" height="90" rx="12" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
        <rect x="192" y="174" width="80" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
        <rect x="192" y="188" width="110" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="192" y="200" width="90" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="192" y="220" width="40" height="16" rx="8" fill="rgba(59,130,246,0.4)" />

        <circle cx="120" cy="210" r="36" fill="rgba(59,130,246,0.2)" />
        <circle cx="120" cy="200" r="14" fill="rgba(255,255,255,0.85)" />
        <rect x="104" y="218" width="32" height="36" rx="16" fill="rgba(59,130,246,0.5)" />

        <circle cx="280" cy="230" r="32" fill="rgba(124,58,237,0.2)" />
        <circle cx="280" cy="222" r="12" fill="rgba(255,255,255,0.85)" />
        <rect x="266" y="238" width="28" height="32" rx="14" fill="rgba(124,58,237,0.45)" />

        <circle cx="200" cy="130" r="6" fill="rgba(59,130,246,0.6)" />
        <circle cx="160" cy="150" r="4" fill="rgba(255,255,255,0.2)" />
        <circle cx="300" cy="140" r="5" fill="rgba(124,58,237,0.5)" />
      </svg>
    </div>
  )
}

export default AuthIllustration
