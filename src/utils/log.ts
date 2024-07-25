import type { Log } from '../stores/vendingMachine';

const getLogMessage = (props: Log) => {
  switch (props.type) {
    case 'insert':
      return `${props.cost.toLocaleString()}원을 투입했습니다.`;
    case 'return':
      return `${props.cost.toLocaleString()}원을 반환합니다.`;
    case 'purchase':
      return `${props.productName}을 구매합니다.`;
    default:
      return ``;
  }
};

export { getLogMessage };
