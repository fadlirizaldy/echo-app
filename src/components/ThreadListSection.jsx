import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { postedAt } from "../utils/formatter";

const ThreadList = (props) => {
  const { threadUserList } = props;
  const navigate = useNavigate();

  const { loadingBar } = useSelector((states) => states);

  return (
    <section className="flex flex-col gap-4 px-4 w-full" key={"thread"}>
      {threadUserList?.length > 0
        ? threadUserList?.map((data, idx) => (
            <div
              key={idx}
              className="border border-slate-200 shadow-sm p-4 rounded-lg relative cursor-pointer"
              onClick={() => navigate(`/threads/${data?.id}`)}
            >
              <div className="mt-2 mb-1 flex items-center gap-2">
                <img src={data?.user?.avatar} alt="pp" className="w-5 h-5 rounded-full" />
                <h2 className="font-semibold text-slate-700">{data?.user?.name}</h2>
                <span>•</span>
                <p className="text-sm text-gray-400">{postedAt(data?.createdAt)}</p>
              </div>
              <h3 className="font-semibold text-lg">{data?.title}</h3>
              <p className="" dangerouslySetInnerHTML={{ __html: data?.body }}></p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <Icon icon="ph:chat" className="text-slate-400 transform -scale-x-100" />
                  <p className="text-slate-400">{data?.totalComments}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="iconamoon:like-thin" className="text-slate-400 transform -scale-x-100" />
                  <p className="text-slate-400">{data?.upVotesBy?.length}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="solar:dislike-line-duotone" className="text-slate-400 transform -scale-x-100" />
                  <p className="text-slate-400">{data?.downVotesBy?.length}</p>
                </div>
              </div>
              <div className="badge badge-outline absolute -top-2 left-5 bg-white border border-slate-200 text-slate-500">
                {data?.category}
              </div>
            </div>
          ))
        : loadingBar.default < 1 && <div className="w-full text-center mt-5">Currently no threads</div>}
    </section>
  );
};

ThreadList.propTypes = {
  threadUserList: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ),
};

export default ThreadList;
