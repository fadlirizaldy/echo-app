import { toast } from "react-toastify";
import { hideLoading, showLoading } from "react-redux-loading-bar";

import { getUserLogged, postLogin, putAccessToken } from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

// ============= THUNK FUNCTION ===============
function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const responseLogin = await postLogin({ email, password });
      if (responseLogin?.error) {
        return responseLogin;
      }

      putAccessToken(responseLogin?.data?.token);
      const authUser = await getUserLogged();
      const dataUser = authUser?.data?.user;

      dispatch(setAuthUserActionCreator(dataUser));
      dispatch(hideLoading());
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    putAccessToken("");

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
