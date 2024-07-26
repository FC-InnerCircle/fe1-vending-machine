import { ComponentPropsWithoutRef } from "react";

interface VendingMachineProductProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  price: number;
}

export function VendingMachineProduct({
  price,
  ...props
}: VendingMachineProductProps) {
  return (
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
      active:bg-indigo-400"
      {...props}
    >{`FE${price}`}</button>
  );
}
