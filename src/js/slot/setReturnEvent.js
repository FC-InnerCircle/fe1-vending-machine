import { $ } from '../utils/utils';
import { logging } from '../log/logging';

function getElements() {
  const returnButton = $('.returnCoin');
  const displayInput = $('.container__vendingmachine__display input');

  if (!returnButton || !displayInput) {
    console.error('One or more elements are not found');
    return null;
  }

  return { returnButton, displayInput };
}

function handleReturnClick() {
  const displayInput = $('.container__vendingmachine__display input');
  logging(`${displayInput.value}원을 반환했습니다.`)
  displayInput.value = 0;
}

function setReturnEvent() {
  const elements = getElements();

  if (!elements) return;

  const { returnButton } = elements;

  returnButton.addEventListener('click', function () {
    handleReturnClick();
  });
}

export { setReturnEvent, handleReturnClick };
