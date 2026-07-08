import Icon, { type IconName } from "@/components/Icon";

export default function PageTitle({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4 flex flex-wrap items-center gap-4 leading-tight">
      <span className="aula-icon text-orange-300 text-xl">
        <Icon name={icon} />
      </span>
      <span>{children}</span>
    </h1>
  );
}
