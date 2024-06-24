import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import { asyncReceiveThreadDetail } from "../states/threadDetail/action";
import { useDispatch, useSelector } from "react-redux";
import DetailThread from "../components/DetailThread";
import CommentSection from "../components/CommentSection";

const Thread = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((states) => states.detailThread);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  return (
    <MainLayout>
      <div className="px-5 mb-5">
        <DetailThread detailThread={detailThread} />
        <CommentSection comments={detailThread?.comments} idThread={id} />
      </div>
    </MainLayout>
  );
};

export default Thread;
