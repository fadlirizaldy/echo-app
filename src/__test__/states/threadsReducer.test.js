/**
 * TEST SCENARIO
 *  - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads data when given by RECEIVE_THREAD action
 *  - should return the threads data with add new data when given by ADD_THREAD action type
 */

import { describe, it, expect } from "vitest";
import threadsReducer from "../../states/threads/reducer";

describe("List threads reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "RANDOM" };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_THREAD action", () => {
    const threads = [];
    const dummyAction = {
      type: "RECEIVE_THREAD",
      payload: {
        threads: [
          {
            id: "thread-aaa",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2024-06-24T14:50:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: "thread-aaa",
            title: "Thread Kedua",
            body: "Ini adalah thread kedua",
            category: "Redux",
            createdAt: "2024-06-24T14:50:00.000Z",
            ownerId: "users-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 5,
          },
        ],
      },
    };

    const nextState = threadsReducer(threads, dummyAction);
    expect(nextState).toEqual(dummyAction.payload.threads);
  });

  it("should return the threads data with add new data when given by ADD_THREAD action type", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const dummyAction = {
      type: "ADD_THREAD",
      payload: {
        thread: {
          id: "thread-bbb",
          title: "Second Thread",
          body: "This is the second thread",
          category: "NextJs",
          createdAt: "2024-06-24T14:50:00.000Z",
          ownerId: "users-bbb",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, dummyAction);

    expect(nextState).toEqual([dummyAction.payload.thread, ...initialState]);
  });
});
