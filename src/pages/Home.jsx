import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ModalNewThread from "../components/ModalNewThread";
import { asyncPopulateUsersThreadsAndLeaderboards } from "../states/shared/action";
import LeaderboardSeciton from "../components/LeaderboardSeciton";
import ThreadList from "../components/ThreadListSection";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const {
    threads = [],
    users = [],
    leaderboards = [],
    authUser,
  } = useSelector((states) => states);

  const threadUserList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndLeaderboards());
  }, [dispatch]);

  const handleShowModal = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.info("please login to add thread", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      navigate("/login");
      return;
    }
    setIsShowModal(true);
  };

  return (
    <MainLayout>
      <div className="flex gap-3">
        <ThreadList threadUserList={threadUserList} />

        <section className="w-[480px] pr-4" key={"leaderboard"}>
          <div>
            <button
              className="btn h-fit min-h-fit w-full py-1 text-lg rounded-md bg-blue-400 text-white hover:bg-blue-500"
              onClick={handleShowModal}
            >
              New Thread
            </button>
          </div>

          <LeaderboardSeciton leaderboards={leaderboards} />
        </section>
      </div>

      {isShowModal && <ModalNewThread setIsShowModal={setIsShowModal} />}
    </MainLayout>
  );
};

export default Home;
