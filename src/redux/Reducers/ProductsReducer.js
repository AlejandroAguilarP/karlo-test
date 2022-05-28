const initialState = {
    products: [],
    errors: undefined
};
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCTS':
        return {
          ...state,
          products: action.payload,
          errors: undefined
        };
      default:
        return state;
    }
  };
  export default productsReducer;
  