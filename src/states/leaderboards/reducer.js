import { ActionType } from "./action";

function getLeaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}

export default getLeaderboardsReducer;
