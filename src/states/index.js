import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

import authUserReducer from "./authUser/reducer";
import getLeaderboardsReducer from "./leaderboards/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import isPreloadReducer from "./isPreload/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    leaderboards: getLeaderboardsReducer,
    threads: threadsReducer,
    detailThread: threadDetailReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
