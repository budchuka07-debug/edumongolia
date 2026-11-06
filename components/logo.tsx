export function Logo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <rect width="36" height="36" rx="9" className="fill-primary" />
      <path
        d="M8 24.5c0-5.6 4.5-9.5 10-9.5s10 3.9 10 9.5"
        fill="none"
        stroke="oklch(0.78 0.11 82)"
        strokeWidth="1.6"
      />
      <path d="M11 24.5h14M18 15.2v9.3" stroke="oklch(0.97 0.01 90)" strokeWidth="1.4" />
    </svg>
  );
}
