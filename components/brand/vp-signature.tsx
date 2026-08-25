export function VPSignature() {
  return (
    <a
      href="https://visionproces.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60
                 hover:text-muted-foreground transition-colors group"
    >
      <span>Desarrollado por</span>
      <span className="font-semibold tracking-tight text-foreground/70 group-hover:text-foreground transition-colors">
        VisionProces
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
           className="opacity-50 group-hover:opacity-100 transition-opacity">
        <path d="M2 3L7 11L12 3" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  )
}
