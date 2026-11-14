function Logo({ width = '100px' }) {
  return (
    <div className="inline-flex items-center gap-2" style={{ width }}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#4f46e5" />
        <path d="M9 22V10l7 8 7-8v12" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-lg font-bold text-slate-900 whitespace-nowrap">MegaBlog</span>
    </div>
  )
}

export default Logo
