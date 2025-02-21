const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const updateCartTotal = () => {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart__item');

  cartItems.forEach((item) => {
    const price = parseFloat(item.dataset.price);
    console.log('price:', price);

    total += price;
    console.log(item.dataset.price);
  });
  document.querySelector('.cart-total').innerText = total.toFixed(2);
};
const cartItemClickListener = (event) => {
  event.target.closest('.cart__item').remove();
  updateCartTotal();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice, thumbnail: image }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.dataset.price = salePrice; // Adicionando o preço como dataset
  li.innerHTML = `
    <img src="${image}" class="cart__item__image" alt="${name}">
    SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}
  `;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getProducts = async (product) => {
  const { results } = await fetchProducts(product);
  const products = results.map((p) => ({
    sku: p.id,
    name: p.title,
    image: p.thumbnail,
  }));
  products.forEach((element) => document.querySelector('.items')
  .appendChild(createProductItemElement(element)));
};
const setProductToCart = async (product) => {
  const useSku = getSkuFromProductItem(product.target.parentNode);
  const useFetchItem = await fetchItem(useSku);
  console.log('Dados do Produto:', useFetchItem);
  const createLi = createCartItemElement(useFetchItem);
  const getCartItem = document.querySelector('.cart__items');

  getCartItem.appendChild(createLi);
  updateCartTotal();
};
function btnCart() {
  const getBtn = document.querySelectorAll('.item__add');
  getBtn.forEach((btn) => btn.addEventListener('click', setProductToCart));
  updateCartTotal();
}

const removeCartItem = () => {
  const btnRemove = document.querySelector('.empty-cart');
  btnRemove.addEventListener('click', () => {
    const cartItemsContainer = document.querySelector('.cart__items');

    while (cartItemsContainer.firstChild) {
      cartItemsContainer.removeChild(cartItemsContainer.firstChild);
    }

    const totalContainer = document.querySelector('.cart-total');
    totalContainer.innerText = 'Total: $0.00';

    btnCart();
  });
};
async function awaitText() {
  const section = document.querySelector('.items');
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'carregando...';
  section.appendChild(div);
  await getProducts('computador');
  div.remove();
}

window.onload = async () => {
  await awaitText();
  btnCart();
  removeCartItem();
};
