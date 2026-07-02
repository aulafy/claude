import Icon, { type IconName } from "@/components/Icon";

export default function SectionHeading({
  id,
  icon,
  children,
  level = 2,
}: {
  id?: string;
  icon: IconName;
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  const className = "flex items-center gap-2";
  const content = (
    <>
      <Icon name={icon} className="text-orange-400" />
      <span>{children}</span>
    </>
  );

  if (level === 3) {
    return (
      <h3 id={id} className={className}>
        {content}
      </h3>
    );
  }

  return (
    <h2 id={id} className={className}>
      {content}
    </h2>
  );
}
