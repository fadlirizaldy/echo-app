import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getAllThreads, getAllUsers, getLeaderboard } from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { toast } from "react-toastify";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";
// import { receiveForumsActionCreator } from '../forums/action';
// import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersThreadsAndLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await getAllUsers();
      const threads = await getAllThreads();
      const leaderboards = await getLeaderboard();
      dispatch(receiveUsersActionCreator(users?.data.users));
      dispatch(receiveThreadsActionCreator(threads?.data));
      dispatch(receiveLeaderboardsActionCreator(leaderboards?.data));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersThreadsAndLeaderboards };
