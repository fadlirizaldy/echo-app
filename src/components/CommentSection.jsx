import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { asyncAddComment } from "../states/threadDetail/action";
import { postedAt } from "../utils/formatter";

const CommentSection = (props) => {
  const { comments, idThread } = props;
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleSubmitComment = async () => {
    if (!authUser) {
      toast.info("Please login to comment", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      navigate("/login");
      return;
    }

    dispatch(asyncAddComment(comment, idThread));
    setComment("");
  };

  return (
    <div>
      <h4 className="font-medium text-gray-700">Comments</h4>
      <div className="flex flex-col">
        <textarea
          rows={4}
          name={"comment"}
          placeholder={"Type a comment.."}
          className={`max-w-[50%] my-3 px-2 py-1 border border-slate-200 focus:ring-blue-200 focus:ring focus:outline-none`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn w-fit h-fit min-h-fit bg-blue-400 text-white hover:bg-blue-500 py-2"
          onClick={handleSubmitComment}
          disabled={!comment}
        >
          Post
        </button>
      </div>

      <div className="mt-4 max-w-[50%] flex flex-col gap-2">
        {comments?.length > 0
          ? comments?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between border border-slate-200 rounded-sm p-4"
              >
                <div className="flex flex-col gap-3 ">
                  <div className="flex items-center gap-2" key={item.id}>
                    <img
                      src={item?.owner?.avatar}
                      alt="profile-img"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="leading-5 text-sm text-slate-600 font-semibold">
                        {item?.owner?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {postedAt(item?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="iconamoon:like-thin"
                      className="text-slate-500 transform -scale-x-100"
                    />
                    <p className="text-slate-400">{item?.upVotesBy?.length}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar:dislike-line-duotone"
                      className="text-slate-400 transform -scale-x-100"
                    />
                    <p className="text-slate-400">
                      {item?.downVotesBy?.length}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : "No comment here yet"}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  idThread: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired
  ).isRequired,
};

export default CommentSection;
