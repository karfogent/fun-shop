const addToCartButtons = document.querySelectorAll(".shop-item-button")

for (let button of addToCartButtons) {
    button.addEventListener("click", addToCartClicked)
}

function addToCartClicked(event) {
    const shopItem = event.target.parentElement.parentElement;

    const title = shopItem.querySelector(".shop-item-title").innerText;
    const price = shopItem.querySelector(".shop-item-price").innerText;
    const imageSrc = shopItem.querySelector(".shop-item-image").src;

    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    console.log("Добавляем товар:", title, price, imageSrc);
    const cartItems = document.querySelector(".cart-items");

    const cartItemNames = cartItems.querySelectorAll(".cart-item-title")
    console.log(cartItemNames);
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Этот товар уже в корзине!")
            return;
        }
    }

    const cartRow = document.createElement("div");
    cartItems.appendChild(cartRow);
    cartRow.classList.add("cart-row");
    cartRow.innerHTML = "<h3>Новая строка</h3>";
    let cartRowContents = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input type="number" value="1" class="cart-quantity-input" min="1">
                    <button class="btn btn-danger" type="button">Удалить</button>
                </div> <hr>`;
    cartRow.innerHTML = cartRowContents;

    cartRow
        .querySelector(".btn-danger")
        .addEventListener("click", removeCartItem);
    cartRow
        .querySelector(".cart-quantity-input")
        .addEventListener("change", quantityChanged);
    updateCartTotal();
}

function removeCartItem(event) {
    console.log("Удаляем элемент.");
    updateCartTotal();
    console.log(event.target.parentElement.parentElement)
    event.target.parentElement.parentElement.remove();
}

function quantityChanged(event) {
    console.log("Изменяем количество товаров.");
    let input = event.target;
    if(isNaN(input.value) || input.value <=0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    const cartRows = document.querySelectorAll(".cart-items .cart-row")
    console.log(cartRows)
    console.log("Обновляем итоговую сумму");
}