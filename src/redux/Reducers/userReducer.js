const initialState = {
    user: {
      isLoggedIn: false,
      user: {},
    },
    errors: undefined
};
  const userReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          errors: undefined
        };
      case 'VERIFYUSER':
        return {
          ...state,
          user: action.payload,
          errors: undefined
        };
      case 'SET_ERRORS':
        return {
          ...state,
          user: {
            isLoggedIn: false,
            user: {}
          },
          errors: [action.payload]
        };
      case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          user: {
            isLoggedIn: false,
            user: {}
          },
          errors: undefined
        };
      default:
        return state;
    }
  };
  export default userReducer;
  