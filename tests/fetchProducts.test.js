require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Test fetchProducts function', () => {
  it('should be a function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('should call fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled()
  });
  it('should request the correct endpoint', async () =>{
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('should have the same data structure of the object', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('should return Error without an argument', async() => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
