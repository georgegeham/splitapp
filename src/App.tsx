import { useEffect, useState } from "react";
import Bill from "./Bill";
import Friends from "./Friends";
import "./tailwind.css";
export interface one {
  id: number;
  name: string;
  value: number;
  image: string;
}
function App() {
  const [list, setList] = useState<one[]>([
    {
      id: Date.now(),
      name: "George",
      value: 0,
      image: "./me.png",
    },
    {
      id: Date.now() + Math.random(),
      name: "Mazen",
      value: 0,
      image: "./1.jpg",
    },
    {
      id: Date.now() + Math.random(),
      name: "Islam",
      value: 0,
      image: "./2.jpg",
    },
  ]);
  const [adding, setAdding] = useState<boolean>(false);
  const [curr, setCurr] = useState<one | null>(null);
  const splitHandler = (id: number, value: number) => {
    const index = list.findIndex((friend) => friend.id === id);
    setList((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, value: friend.value + value } : friend
      )
    );
  };
  return (
    <main className="flex justify-center items-center gap-12 h-screen w-full bg-orange-400">
      <Friends
        friends={list}
        addFriend={setList}
        curr={curr}
        select={setCurr}
        isAdding={adding}
        AddingHandler={setAdding}
      />
      {curr && <Bill curr={curr} select={setCurr} handler={splitHandler} />}
    </main>
  );
}
export default App;
