import { ComponentPropsWithoutRef } from "react";

interface VendingMachineProductProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  price: number;
}

export function VendingMachineProduct({
  price,
  ...props
}: VendingMachineProductProps) {
  return <button {...props}>{`FE${price}`}</button>;
}
