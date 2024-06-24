/* eslint-disable no-unsafe-optional-chaining */
import { ActionType } from "./action";

function threadDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.ADD_COMMENT_THREAD:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread?.comments],
      };
    case ActionType.UP_VOTE:
      if (detailThread.id === action.payload.vote.threadId) {
        const tmpObj = { ...detailThread };

        const downVoteFiltered = detailThread.downVotesBy.filter(
          (vote) => vote !== action.payload.vote.userId
        );

        tmpObj.downVotesBy = [...downVoteFiltered];

        tmpObj.upVotesBy = [
          action.payload.vote.userId,
          ...detailThread?.upVotesBy,
        ];

        detailThread = { ...tmpObj };
      }
      return detailThread;
    case ActionType.DOWN_VOTE:
      if (detailThread.id === action.payload.vote.threadId) {
        const tmpObj = { ...detailThread };

        const upVoteFiltered = detailThread.upVotesBy.filter(
          (vote) => vote !== action.payload.vote.userId
        );

        tmpObj.upVotesBy = [...upVoteFiltered];

        tmpObj.downVotesBy = [
          action.payload.vote.userId,
          ...detailThread?.downVotesBy,
        ];

        detailThread = { ...tmpObj };
      }
      return detailThread;
    default:
      return detailThread;
  }
}

export default threadDetailReducer;
