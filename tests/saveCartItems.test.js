const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Test saveCartItems function', () => {
  it('should call localStorage.setItem', async () => {
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toBeCalled()
  })
  it('should call with 2 parameters', async () => {
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>')
  })

});
