export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function parseFormattedNumber(formattedNumber) {
  return parseInt(formattedNumber.replace(/,/g, ''), 10);
}