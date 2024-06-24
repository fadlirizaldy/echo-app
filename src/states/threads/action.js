import { hideLoading, showLoading } from "react-redux-loading-bar";
import { postNewThread } from "../../utils/api";
import { toast } from "react-toastify";

const ActionType = {
  RECEIVE_THREAD: "RECEIVE_THREAD",
  ADD_THREAD: "ADD_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREAD,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, body }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await postNewThread({ title, body });
      dispatch(addThreadActionCreator(thread.data.thread));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
};
