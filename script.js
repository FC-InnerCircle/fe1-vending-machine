document.addEventListener("DOMContentLoaded", function () {
  setItems();
});

/**
 * @desc item html 생성
 */
function setItems() {
  var itemContainer = document.getElementById("item-container");

  // 아이템 block 생성
  for (var value = 300; value <= 1100; value += 100) {
    var item = document.createElement("div");
    item.id = "item";
    item.setAttribute("value", value);
    item.className =
      "p-4 text-center bg-yellow-200 hover:bg-yellow-600 active:bg-yellow-700 cursor-pointer";
    item.textContent = "FE" + value;

    // 클릭 이벤트 추가
    item.addEventListener("click", function () {
      purchaseItem.call(this);
    });

    itemContainer.appendChild(item);
  }
}
