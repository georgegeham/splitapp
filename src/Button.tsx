export default function Button({
  children,
  onPress,
}: {
  children: string;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="rounded-xl bg-orange-400 px-4 py-1 text-sm font-light ml-7 outline-none self-end"
    >
      {children}
    </button>
  );
}
