const initialState = {
    users: [],
    errors: undefined
};
  const usersReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          users: action.payload,
          errors: undefined
        };
      case 'CREATE_USER':
        return {...state, users: [action.payload].concat(state.users)};
      case 'UPDATE_USER':
        return {
          ...state,
          users: state.users.map(
            (user) => action.payload.user_id === user.user_id ? {...action.payload}
            : user
          ),
          errors: undefined
        };
      case 'DELETE_USER':
        return {
          ...state,
          users: state.users.filter(
            (user) => action.payload !== user.user_id),
          errors: undefined
        };
      default:
        return state;
    }
  };
  export default usersReducer;
  