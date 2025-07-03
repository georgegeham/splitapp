import Button from "./Button";
import Friend from "./Friend";
import { one } from "./App";
import Input from "./Input";
import { ChangeEvent, useEffect, useState } from "react";
type FrinedsProps = {
  friends: one[];
  addFriend: React.Dispatch<React.SetStateAction<one[]>>;
  curr: one | null;
  select: React.Dispatch<React.SetStateAction<one | null>>;
  isAdding: boolean;
  AddingHandler: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Friends({
  friends,
  addFriend,
  curr,
  select,
  isAdding,
  AddingHandler,
}: FrinedsProps) {
  const [added, setAdded] = useState<one>({
    id: Date.now() + Math.random(),
    name: "",
    value: 0,
    image: "./me.png",
  });
  useEffect(() => {
    console.log(added);
  }, [added]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setAdded((prev) => ({ ...prev, [name]: value }));
  }
  function handleAdd() {
    AddingHandler((prev) => !prev);
  }
  function handleSubmit() {
    addFriend((prev) => [...prev, added]);
    handleAdd();
  }
  return (
    <main className="flex flex-col g-3 justify-center min-w-80 bg-orange-100 p-4 rounded-md">
      <section className="flex flex-col justify-center items-center g-4  divide-y-1 mb-4">
        {friends.map((friend) => (
          <Friend {...friend} key={friend.id} select={select} />
        ))}
      </section>
      {isAdding && (
        <form
          className="flex  flex-col justify-center items-center w-60 mx-auto border-2 border-orange-300 p-4 rounded-md gap-3 my-3"
          onSubmit={handleSubmit}
        >
          <Input>
            <p className="text-sm">🧍Name</p>
            <input
              type="text"
              className="rounded-sm max-w-24 text-center outline-orange-500 font-light"
              name="name"
              value={added.name}
              onChange={handleChange}
              required
            />
          </Input>
          <Input>
            <p className="text-sm">📷 Photo</p>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="rounded-sm w-24 text-center outline-orange-500 font-light"
              alt="Image"
              onChange={handleChange}
            />
          </Input>
          <button
            type="submit"
            className="  rounded-xl bg-orange-400 px-4 py-1 text-sm font-light ml-7 outline-none self-end "
          >
            Add
          </button>
        </form>
      )}
      <Button onPress={handleAdd}>Add a friend</Button>
    </main>
  );
}
