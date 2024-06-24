import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

import { formatDate } from "../utils/formatter";
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
} from "../states/threadDetail/action";
import { toast } from "react-toastify";

const DetailThread = (props) => {
  const { detailThread } = props;
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const handleUpVoteThread = () => {
    if (!authUser) {
      toast.info("please login to up vote", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      return;
    }
    dispatch(asyncUpVoteThread(detailThread.id));
  };

  const handleDownVoteThread = () => {
    if (!authUser) {
      toast.info("please login to up vote", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      return;
    }
    dispatch(asyncDownVoteThread(detailThread.id));
  };

  const isUpVote = detailThread?.upVotesBy?.includes(authUser?.id);
  const isDownVote = detailThread?.downVotesBy?.includes(authUser?.id);

  return (
    <>
      <div className="flex items-center gap-3">
        <img
          src={detailThread?.owner?.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">{detailThread?.title}</h2>
          <p className="text-slate-500">
            {formatDate(detailThread?.createdAt)}
          </p>
          <div className="badge badge-outline">{detailThread?.category}</div>
        </div>
      </div>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: detailThread?.body }}
      />

      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-1">
          <Icon
            icon="ph:chat"
            className="text-slate-400 transform -scale-x-100"
          />
          <p className="text-slate-400">{detailThread?.comments?.length}</p>
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleUpVoteThread}
        >
          <Icon
            icon={isUpVote ? "iconamoon:like-fill" : "iconamoon:like-thin"}
            className={`${
              isUpVote ? "text-emerald-400" : "text-slate-400"
            } transform -scale-x-100`}
          />
          <p className="text-slate-400">{detailThread?.upVotesBy?.length}</p>
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleDownVoteThread}
        >
          <Icon
            icon={
              isDownVote
                ? "solar:dislike-bold-duotone"
                : "solar:dislike-line-duotone"
            }
            className={`${
              isDownVote ? "text-red-400" : "text-slate-400"
            } transform -scale-x-100`}
          />
          <p className="text-slate-400">{detailThread?.downVotesBy?.length}</p>
        </div>
      </div>

      <div className="border border-slate-200 my-3 h-px"></div>
    </>
  );
};

DetailThread.propTypes = {
  detailThread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
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
  }).isRequired,
};

export default DetailThread;
