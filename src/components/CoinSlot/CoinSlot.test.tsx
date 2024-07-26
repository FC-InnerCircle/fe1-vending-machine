import {describe, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import CoinSlot from "./CoinSlot.tsx";

describe('CoinSlot', () => {
  it('주어진 amount를 렌더한다.', () => {
    const amount = 1231313;
    render(<CoinSlot amount={amount}/>);

    expect(screen.getByDisplayValue(amount)).toBeInTheDocument();
  });
});
