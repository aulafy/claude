import Icon, { type IconName } from "@/components/Icon";

export default function PageTitle({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <h1 className="text-4xl font-bold text-white mb-4 flex flex-wrap items-center gap-3">
      <Icon name={icon} className="text-3xl text-orange-400" />
      <span>{children}</span>
    </h1>
  );
}
