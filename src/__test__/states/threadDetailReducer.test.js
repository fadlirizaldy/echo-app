/**
 * TEST SCENARIO
 *  - forumDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads data when given by RECEIVE_FORUM_DETAIL action
 *  - should return the threads data with the thread voted by the user when given by UP_VOTE action type
 */

import { describe, it, expect } from "vitest";
import threadDetailReducer from "../../states/threadDetail/reducer";

describe("Thread detail reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "RANDOM" };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_DETAIL_THREAD action", () => {
    const detailThread = [];
    const dummuyAction = {
      type: "RECEIVE_DETAIL_THREAD",
      payload: {
        detailThread: {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2024-06-24T14:30:00.000Z",
          owner: {
            id: "users-aaa",
            name: "Fadli",
            avatar: "https://random.com/img.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: "comment-aaa",
              content: "Saya komen",
              createdAt: "2023-06-24T14:30:00.000Z",
              owner: {
                id: "users-aaa",
                name: "Fadli",
                avatar: "https://random.com/img.jpg",
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    const nextState = threadDetailReducer(detailThread, dummuyAction);
    expect(nextState).toEqual(dummuyAction.payload.detailThread);
  });

  it("should return the threads with the thread liked by the user when given by UP_VOTE_THREAD action", () => {
    const detailThread = {
      id: "thread-aaa",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2024-06-24T14:30:00.000Z",
      owner: {
        id: "users-aaa",
        name: "Fadli",
        avatar: "https://random.com/img.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-aaa",
          content: "Saya komen",
          createdAt: "2024-06-24T14:30:00.000Z",
          owner: {
            id: "users-aaa",
            name: "Fadli",
            avatar: "https://random.com/img.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const downFilter = [];

    const dummyAction = {
      type: "UP_VOTE",
      payload: {
        vote: {
          id: "vote-aaa",
          userId: "users-bbb",
          threadId: "thread-aaa",
          voteType: 1,
        },
      },
    };

    const nextState = threadDetailReducer(detailThread, dummyAction);
    expect(nextState).toEqual({
      ...detailThread,
      upVotesBy: [dummyAction.payload.vote.userId, ...detailThread.upVotesBy],
      downVotesBy: [...downFilter],
    });
  });
});
