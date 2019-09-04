const initialState = {
  products: []
};

const productsReducer = (state = initialState, action) => {
  console.log("reducer", action);
};

export default productsReducer;
