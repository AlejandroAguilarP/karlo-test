import { SetErrors } from ".";
import apiTest from "../../api/api";
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "./types";
export const createUser = (data) => {
  alert(data.user_name)
  return {
    type: CREATE_USER,
    payload: data,
  };
}
export function createUserFn(user_data) {
    return async (dispatch) => {
      try {
        const { data } = await apiTest.post("/users", user_data);
        await dispatch(createUser(data.user))
        return data || [];
      } catch (error) {
        dispatch(SetErrors(error.response.data));
        return error.response.data;
      }
    };
  }


  export const getUsers = (data) => {
    console.log(data)
    return {
      type: GET_USERS,
      payload: data,
    };
  }
  
  
  export function getUsersFn() {
    return async (dispatch) => {
      try {
        const { data } = await apiTest.get("/users");
        await dispatch(getUsers(data.users));
        return data || [];
      } catch (error) {
        dispatch(SetErrors(error.response.data));
        return false;
      }
    };
  }


  export const updateUser = (data) => {
    console.log(data)
    return {
      type: UPDATE_USER,
      payload: data,
    };
  }
  
  
  export function updateUserFn(UserData) {
    return async (dispatch) => {
      try {
        const { data } = await apiTest.put("/users/" + UserData.user_id, UserData);
        await dispatch(updateUser(data.user));
        return data || [];
      } catch (error) {
        dispatch(SetErrors(error.response.data));
        return false;
      }
    };
  }

  export const deleteUser = (data) => {
    console.log(data)
    return {
      type: DELETE_USER,
      payload: data,
    };
  }
  
  
  export function deleteUserFn(user_id) {
    return async (dispatch) => {
      try {
        const { data } = await apiTest.delete("/users/" + user_id);
        await dispatch(deleteUser(user_id));
        return data || [];
      } catch (error) {
        dispatch(SetErrors(error.response.data));
        return false;
      }
    };
  }