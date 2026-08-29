export default function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <img
      src="/aulafy-logo.png"
      width={32}
      height={32}
      className={className}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
    />
  );
}
