import Input from "./Input";
import Button from "./Button";
import { one } from "./App";
import { ChangeEvent, useState } from "react";
interface BillDetails {
  value: number;
  myExpense: number;
  friendExpense: number;
  payer: string;
}
type splitHandlerType = (id: number, value: number) => void;
export default function Bill({
  curr,
  select,
  handler,
}: {
  curr: one | null;
  select: React.Dispatch<React.SetStateAction<one | null>>;
  handler: splitHandlerType;
}) {
  const [bill, setBill] = useState<BillDetails>({
    value: 0,
    myExpense: 0,
    friendExpense: 0,
    payer: "you",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = Number(value);
    let updatedBill = { ...bill, [name]: newValue };
    if (name === "value" || name === "myExpense") {
      const total = name === "value" ? newValue : bill.value;
      const mine = name === "myExpense" ? newValue : bill.myExpense;
      const friend = total - mine;
      updatedBill.friendExpense = friend > 0 ? friend : 0;
    }
    setBill(updatedBill);
  };
  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBill((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = () => {
    let value = 0;
    if (bill.payer === "you") {
      value = bill.friendExpense;
    } else {
      value = bill.myExpense * -1;
    }
    handler(curr!.id, value);
  };
  return (
    <main className="p-4 rounded-md flex flex-col bg-orange-100 w-96 px-8 items-start min-h-80 justify-between">
      <h1 className="font-bold uppercase tracking-wide">
        Split a bill with {curr!.name}
      </h1>
      <form className="flex flex-col h-full w-full items-center gap-4">
        <Input>
          <p className="text-sm">💰 Bill Value</p>
          <input
            type="number"
            value={bill.value}
            name="value"
            onChange={onChange}
            className="rounded-sm max-w-24 text-center outline-orange-500 font-light"
            onFocus={(e) => e.target.select()}
          />
        </Input>
        <Input>
          <p className="text-sm">🧍 Your Expense</p>
          <input
            type="number"
            name="myExpense"
            value={bill.myExpense}
            onChange={onChange}
            className="rounded-sm max-w-24 text-center outline-orange-500 font-light"
            onFocus={(e) => e.target.select()}
          />
        </Input>
        <Input>
          <p className="text-sm">👯‍♀️ {curr!.name}'s expense:</p>
          <input
            type="number"
            name="friendExpense"
            value={bill.friendExpense}
            onChange={onChange}
            readOnly
            className="rounded-sm max-w-24 text-center outline-orange-500 font-light"
          />
        </Input>
        <Input>
          <p className="text-sm">🤑 Who is paying the bill?</p>
          <select
            value={bill.payer}
            name="payer"
            onChange={onChangeSelect}
            className="rounded-sm  text-center  w-24 text-sm outline-orange-500 font-light"
          >
            <option value="you">You</option>
            <option value={curr!.name}>{curr!.name}</option>
          </select>
        </Input>
      </form>
      <Button onPress={onSubmit}>Split bill</Button>
    </main>
  );
}
