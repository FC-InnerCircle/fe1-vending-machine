import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import PurchaseButton from "./PurchaseButton.tsx";

describe('PurchaseButton', () => {
  describe('price로 300이 주어지면', () => {
    const price = 300;

    it('FE300을 렌더한다.', () => {
      render(<PurchaseButton price={price}/>);

      expect(screen.getByRole('button')).toHaveTextContent('FE300');
    });

    it('클릭했을 때 300과 함께 onClick 핸들러를 호출한다.', async () => {
      const fn = vi.fn();
      render(<PurchaseButton price={price} onClick={fn}/>);

      await userEvent.click(screen.getByRole('button'));

      expect(fn).toBeCalledWith(price);
    });
  });

  describe('price로 500이 주어지면', () => {
    const price = 500;

    it('FE500을 렌더한다.', () => {
      render(<PurchaseButton price={price}/>);

      expect(screen.getByRole('button')).toHaveTextContent('FE500');
    });

    it('클릭했을 때 500과 함께 onClick 핸들러를 호출한다.', async () => {
      const fn = vi.fn();
      render(<PurchaseButton price={price} onClick={fn}/>);

      await userEvent.click(screen.getByRole('button'));

      expect(fn).toBeCalledWith(price);
    });
  });

  describe('price로 59848954이 주어지면', () => {
    const price = 59848954;

    it('FE59848954을 렌더한다.', () => {
      render(<PurchaseButton price={59848954}/>);

      expect(screen.getByRole('button')).toHaveTextContent('FE59848954');
    });

    it('클릭했을 때 59848954과 함께 onClick 핸들러를 호출한다.', async () => {
      const fn = vi.fn();
      render(<PurchaseButton price={price} onClick={fn}/>);

      await userEvent.click(screen.getByRole('button'));

      expect(fn).toBeCalledWith(price);
    });
  });
});
