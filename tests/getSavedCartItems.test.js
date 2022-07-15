const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Test getSavedCartItems function', () => {
  it('should call localStorage.getItem', async () => {
    await getSavedCartItems()
    expect(localStorage.getItem).toBeCalled()
  })
  it('should call a parameter', async () => {
    await getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
