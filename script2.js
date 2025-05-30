function toNum(str) {
    const num = Number(str.replace(/ /g, ""));
    return num;
  }
  
  function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }
  
  // Корзина
  
  const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
  const cartNum = document.querySelector("#cart_num");
  const cart = document.querySelector("#cart");
  
  class Cart {
    products;
    constructor() {
      this.products = [];
    }
    get count() {
      return this.products.length;
    }
    addProduct(product) {
      this.products.push(product);
    }
    removeProduct(index) {
      this.products = this.products.filter((_, indexProduct) => index !== indexProduct);
    }
    get cost() {
      const prices = this.products.map((product) => {
        return toNum(product.price);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
  }
  
  class Product {
    imageSrc;
    name;
    price;
    constructor(card) {
      this.imageSrc = card.querySelector(".prod-img").src;
      this.name = card.querySelector(".product-name").innerText;
      this.price = card.querySelector(".product-price").innerText;
    }
  }
  
  const myCart = new Cart();
  
  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
  }
  
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  cartNum.textContent = myCart.count;
  
  myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".product");
      const product = new Product(card);
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
      myCart.addProduct(product);
      localStorage.setItem("cart", JSON.stringify(myCart));
      cartNum.textContent = myCart.count;
    });
  });
  
  // Попап
  
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector("#popup_close");
  const body = document.body;
  const popupContainer = document.querySelector("#popup_container");
  const popupProductList = document.querySelector("#popup_product_list");
  const popupCost = document.querySelector("#popup_cost");
  
  cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
  });
  
  function popupContainerFill() {
    popupProductList.innerHTML = null;
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const productsHTML = myCart.products.map((product, index) => {
      const productItem = document.createElement("div");
      productItem.classList.add("popup__product");
  
      const productWrap1 = document.createElement("div");
      productWrap1.classList.add("popup__product-wrap");
      const productWrap2 = document.createElement("div");
      productWrap2.classList.add("popup__product-wrap");
  
      const productImage = document.createElement("img");
      productImage.classList.add("popup__product-image");
      productImage.setAttribute("src", product.imageSrc);
  
      const productTitle = document.createElement("h2");
      productTitle.classList.add("popup__product-title");
      productTitle.innerHTML = product.name;
  
      const productPrice = document.createElement("div");
      productPrice.classList.add("popup__product-price");
      productPrice.innerHTML = product.price;
  
      const productDelete = document.createElement("button");
      productDelete.classList.add("popup__product-delete");
      productDelete.innerHTML = "&#10006;";
  
      productDelete.addEventListener("click", () => {
        myCart.removeProduct(index);
        localStorage.setItem("cart", JSON.stringify(myCart));
        popupContainerFill();
      });
  
      productWrap1.appendChild(productImage);
      productWrap1.appendChild(productTitle);
      productWrap2.appendChild(productPrice);
      productWrap2.appendChild(productDelete);
      productItem.appendChild(productWrap1);
      productItem.appendChild(productWrap2);
  
      return productItem;
    });
  
    productsHTML.forEach((productHTML) => {
      popupProductList.appendChild(productHTML);
    });
  
    popupCost.value = toCurrency(myCart.cost);
  }
  
  popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("popup--open");
    body.classList.remove("lock");
  });


  document.getElementById('confirm_order').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращает переход по ссылке

    const productTitle = document.querySelector('.popup__product-title').textContent;
    const productPrice = document.querySelector('.popup__product-price').textContent;
    const totalCost = document.getElementById('popup_cost').textContent;

    // Создание объекта с данными заказа
    const order = JSON.parse(localStorage.getItem('cart'));

    // Сохранение данных заказа в локальном хранилище
    localStorage.setItem('order', JSON.stringify(order));

    // Переход к странице деталей заказа
    window.location.href = 'success.html'; // измените на нужный вам путь
});