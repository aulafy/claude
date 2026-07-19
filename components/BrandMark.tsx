export default function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="8" y="8" width="80" height="80" rx="25" fill="currentColor" />
      <path d="M28 71 43 26h11l15 45H58l-3-10H42l-3 10H28Zm17-20h8l-4-14-4 14Z" fill="#fff" />
    </svg>
  );
}
