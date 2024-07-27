import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import LogBox from "./LogBox.tsx";

const logs = [
  '600원을 투입했습니다.',
  'FE500을 구매했습니다.',
  '100원을 반환합니다.',
];

describe('LogBox', () => {
  it('logs로 주어진 문자열을 모두 렌더한다.', () => {
    render(<LogBox logs={logs}/>);

    logs.forEach(log => {
      expect(screen.getByText(log)).toBeInTheDocument();
    })
  });
});
