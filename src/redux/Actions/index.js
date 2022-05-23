import apiTest from "../../api/api";
import { LOGIN, SET_ERRORS } from "./types";

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
      console.log(data);
      await dispatch(Login(data.data));
      return data || [];
    } catch (error) {
      dispatch(SetErrors(error.response.data));
      return false;
    }
  };
}
