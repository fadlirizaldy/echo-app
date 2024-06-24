import { getUserLogged } from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

// ============= THUNK ==================
function asyncPreloadProccess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await getUserLogged();
      const dataUser = authUser?.data?.user;

      dispatch(setAuthUserActionCreator(dataUser));
    } catch (error) {
      dispatch(setIsPreloadActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProccess };
