export default function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-rose-300" role="alert">{errors[0]}</p>;
}
