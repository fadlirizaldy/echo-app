/**
 * TEST SCENARIO
 *  - asyncAddThread thunk
 *  - should dispatch action correctly when adding thread successfully
 *  - should dispatch action and call toastify alert correctly when add thread failed
 */
import { describe, it, expect, vi } from "vitest";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { addThreadActionCreator, asyncAddThread } from "../../states/threads/action";
import { postNewThread } from "../../utils/api";

vi.mock("../../utils/api", () => ({
  postNewThread: vi.fn(),
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

const thread = {
  id: "thread-1",
  title: "Initial Thread",
  body: "This is thread",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe("asyncAddThread thunk", () => {
  it("should dispatch action correctly when add thread success", async () => {
    postNewThread.mockResolvedValue({ error: false, data: { thread } });

    const dispatch = vi.fn();

    const payload = {
      title: "Initial Thread",
      body: "This is thread",
    };

    await asyncAddThread(payload)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(thread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should dispatch actions correctly on error", async () => {
    const errorMessage = "Failed to add thread";
    postNewThread.mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();

    const payload = {
      title: "Initial Thread",
      body: "This is thread",
    };

    await asyncAddThread(payload)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
