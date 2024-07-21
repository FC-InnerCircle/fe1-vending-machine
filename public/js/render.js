const render = (function () {
    function update(state) {
        // document.getElementById('count').textContent = state.count;

        const itemList = document.getElementById('itemList');
        console.log("itemList:", itemList)
        itemList.innerHTML = state.items.map(item => `
            <button class="item-button p-2 bg-red-100 hover:bg-red-300 m-2 rounded" data-id="${item.id}">
              ${item.text}
            </button>
          `).join('');

        document.querySelectorAll('.item-button').forEach(button => {
            button.addEventListener('click', function () {
                button.classList.add('hover:bg-red-500');
            });
            button.addEventListener('mouseleave', function () {
                button.classList.remove('hover:bg-red-500');
            });
        });


    }

    return {
        update
    };
})();