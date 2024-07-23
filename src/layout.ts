import { Main, Section, Div } from "./components/index";

const mainComponent = new Main({
  className:
    "w-full h-screen flex flex-col justify-center items-center p-5 lg:flex-row",
});
const productDisplayPanel = new Section({
  className: "w-[380px] h-[350px] bg-gray-100 p-5",
});
const balancePanel = new Section({
  className: "w-[380px] h-[350px] p-5",
});
const productButtonsPanel = new Div({
  className: "w-full flex flex-wrap gap-5",
});
const balanceControllPanel = new Div({
  className: "w-full flex justify-between mb-5",
});

const balanceHistoryDisplay = new Div({
  className:
    "w-full h-[240px] p-1 overflow-y-auto border-2 border-black bg-white flex flex-col",
});

export {
  mainComponent,
  productDisplayPanel,
  balancePanel,
  productButtonsPanel,
  balanceControllPanel,
  balanceHistoryDisplay,
};
