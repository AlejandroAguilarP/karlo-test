import apiTest from "../../api/api";
import { LOGIN, SET_ERRORS, GET_USERS, GET_PRODUCTS,LOGOUT } from "./types";

export const Login = (data) => {
  
  localStorage.setItem("token", data.token);
  const user = {
    isLoggedIn: true,
    ...data.user
  }
  return {
    type: LOGIN,
    payload: user,
  };
};
export const SetErrors = (data) => {
  return {
    type: SET_ERRORS,
    payload: data,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};
export function getlogout () {
  return async (dispatch) => {
    try {
      await dispatch(logout())
      return true;
    } catch (error) {
      return new Error('Error');
    }
  }
};


export function getLogin(user_data) {
  return async (dispatch) => {
    try {
      const { data } = await apiTest.post("/login", user_data);
      console.log(data);
      await dispatch(Login(data.data));
      return data || [];
    } catch (error) {
      dispatch(SetErrors(error.response.data));
      return false;
    }
  };
}

export function getCurrentUser() {
  return async (dispatch) => {
    try {
      const { data } = await apiTest.get("/verifyUser");
      await dispatch(Login(data.data));
      return data || [];
    } catch (error) {
      dispatch(SetErrors(error.response.data));
      return false;
    }
  };
}


export function getRegister(user_data) {
  return async (dispatch) => {
    try {
      const { data } = await apiTest.post("/register", user_data);
      await dispatch(Login(data.data));
      return data || [];
    } catch (error) {
      dispatch(SetErrors(error.response.data));
      return false;
    }
  };
}



export const getProducts = (data) => {
  console.log(data)
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
}


export function getProductsFn() {
  return async (dispatch) => {
    try {
      const { data } = await apiTest.get("/products");
      await dispatch(getProducts(data.products));
      return data || [];
    } catch (error) {
      dispatch(SetErrors(error.response.data));
      return false;
    }
  };
}


