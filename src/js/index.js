import Items from './Items.js';

const menuSection = document.querySelector('.menu');

const btnStyle =
  'flex items-center justify-center w-32 h-20 bg-blue-300 hover:bg-blue-400 active:bg-blue-500 text-white font-bold rounded shadow-md transition-all duration-200';

// 렌더링
Items.forEach((item) => {
  const itemList = document.createElement('li');
  itemList.innerHTML = `<button class="${btnStyle}" type="button">${item.name}</button>`;

  menuSection.appendChild(itemList);
});
