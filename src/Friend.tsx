import { one } from "./App";
import Button from "./Button";
interface FriendProps extends one {
  select: React.Dispatch<React.SetStateAction<one | null>>;
}
export default function Friend({
  id,
  name,
  value,
  image,
  select,
}: FriendProps) {
  return (
    <main className="py-4 flex gap-3 justify-center  hover:bg-orange-200 p-2 rounded-md  cursor-pointer">
      <section className=" max-h-10 flex justify-center items-center self-center max-w-10 overflow-hidden rounded-full">
        <img
          src={image}
          alt="friend"
          className=" w-full h-full
      "
        />
      </section>
      <section className="flex justify-center items-center">
        <section className="h-full min-w-36 flex flex-col justify-evenly">
          <h3 className="text-md font-semibold">{name}</h3>
          <p
            className={
              value < 0 ? "text-xs text-red-800" : "text-xs text-green-900 "
            }
          >
            {value === 0
              ? `You and ${name} are even`
              : value < 0
              ? `You owe ${name} ${value}$`
              : `${name} owes you ${value}$`}
          </p>
        </section>
        <Button
          onPress={() =>
            select({ id: id, name: name, value: value, image: image })
          }
        >
          Select
        </Button>
      </section>
    </main>
  );
}
