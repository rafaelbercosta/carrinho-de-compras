require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Test fetchItem function', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toEqual('function')
  })
  it('should call fetch', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalled()
  })
  it('should request the correct endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  it('should have the same data structure of the object', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item)
  })
  it('should return Error without an argument', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
  })
});
