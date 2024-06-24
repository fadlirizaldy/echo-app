import { toast } from "react-toastify";
import { postRegister } from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await postRegister({ name, email, password });
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
