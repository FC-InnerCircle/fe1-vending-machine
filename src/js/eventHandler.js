export function onHoverButton(e) {
  const elem = e.target;
  elem.classList.add('hover');
}

export function onLeaveButton(e) {
  const elem = e.target;
  elem.classList.remove('hover');
}

export function onClickButton(e) {
  const elem = e.target;
  elem.classList.add('active');
}

export function onReleaseButton(e) {
  const elem = e.target;
  elem.classList.remove('active');
}
