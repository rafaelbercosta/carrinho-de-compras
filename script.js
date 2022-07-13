const items = document.querySelector('.items');
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

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
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
  const createLi = createCartItemElement(useFetchItem);
  const getCartItem = document.querySelector('.cart__items');

  getCartItem.appendChild(createLi);
};
function useBtnCart() {
  const getBtn = document.querySelectorAll('.item__add');
  getBtn.forEach((btn) => btn.addEventListener('click', setProductToCart));
}

window.onload = async () => {
  await getProducts('computador');
useBtnCart();
};
