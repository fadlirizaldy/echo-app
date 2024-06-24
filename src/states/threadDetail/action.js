import { toast } from "react-toastify";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getDetailThread, postCreateComment, postDownVoteThread, postUpVoteThread } from "../../utils/api";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  UP_VOTE: "UP_VOTE",
  DOWN_VOTE: "DOWN_VOTE",
  RECEIVE_COMMENT: "RECEIVE_COMMENT",
  ADD_COMMENT_THREAD: "ADD_COMMENT_THREAD",
};

function upVoteThread(vote) {
  return {
    type: ActionType.UP_VOTE,
    payload: {
      vote,
    },
  };
}

function downVoteThread(vote) {
  return {
    type: ActionType.DOWN_VOTE,
    payload: {
      vote,
    },
  };
}

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function addCommentThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const detailThread = await getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread.data));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const vote = await postUpVoteThread(threadId);
      dispatch(upVoteThread(vote.data.vote));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const vote = await postDownVoteThread(threadId);
      dispatch(downVoteThread(vote.data.vote));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment(content, threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await postCreateComment(threadId, content);
      dispatch(addCommentThreadActionCreator(comment.data.comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  upVoteThread,
  downVoteThread,
  receiveDetailThreadActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncAddComment,
};
