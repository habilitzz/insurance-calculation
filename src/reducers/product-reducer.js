const initailState = 
{
  products: [],
  isShowloading: false
};

const productReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      return Object.assign({}, state, {
        products: action.products,
        isShowloading: false
      });
    case 'UPDATE_ISLOADING':
      return Object.assign({}, state, {
        isShowloading: true,
      });
    default: return state;
  }
}

export default productReducer;