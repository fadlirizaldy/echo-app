/**
 * TEST SCENARIO
 *  - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toastify alert correctly when data fetching failed
 */

import { describe, it, expect, vi } from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";

import { getDetailThread } from "../../utils/api";
import { asyncReceiveThreadDetail, receiveDetailThreadActionCreator } from "../../states/threadDetail/action";

vi.mock("../../utils/api", () => ({
  getDetailThread: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("react-redux-loading-bar", () => ({
  showLoading: () => ({ type: "showLoading" }),
  hideLoading: () => ({ type: "hideLoading" }),
}));

describe("asyncReceiveThreadDetail thunk", () => {
  it("should dispatch actions correctly on success", async () => {
    const detailThread = {
      id: "thread-aaa",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    getDetailThread.mockResolvedValue({ error: false, data: detailThread });

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail("thread-aaa")(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(detailThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should dispatch actions correctly on error", async () => {
    const errorMessage = "Failed to fetch detail thread";
    getDetailThread.mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail("1")(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
