/**
 * scenario test
 *
 * - asyncGetLeaderBoardsActionCreator thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../data/api";
import { asyncGetLeaderBoardsActionCreator, getLeaderBoardsActionCreator } from "./action";

const fakeLeaderboardResponse = [
  {
    user: {
      id: "user-aaa",
      name: "Dimas",
      email: "dimas@wkwk.com",
      avatar: "https://ui-avatars.com/api/?name=Dimas Saputra&background=random",
    },
    score: 100,
  },
  {
    user: {
      id: "user-bbb",
      name: "Dicoding",
      email: "admin@dikoding.com",
      avatar: "https://ui-avatars.com/api/?name=Dicoding&background=random",
    },
    score: 15,
  },
  {
    user: {
      id: "user-ccc",
      name: "Firzha",
      email: "firzha@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Firzha&background=random",
    },
    score: 0,
  },
];

const fakeErrorResponse = new Error("Ups, something wrong");

describe("asyncGetLeaderBoardsActionCreator thunk", () => {
  beforeEach(() => {
    api._seeLeaderboards = api.seeLeaderboards;
  });

  afterEach(() => {
    // restore original implementation
    api.seeLeaderboards = api._seeLeaderboards;

    // delete backup
    delete api._seeLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.seeLeaderboards = () => Promise.resolve(fakeLeaderboardResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // action
    await asyncGetLeaderBoardsActionCreator()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(getLeaderBoardsActionCreator(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.seeLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncGetLeaderBoardsActionCreator()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
