import PropTypes from "prop-types";

const LeaderboardSeciton = (props) => {
  const { leaderboards } = props;
  return (
    <div className="mt-3">
      <h3 className="font-medium text-lg underline mb-2">Leaderboard</h3>
      {leaderboards?.length > 0
        ? leaderboards?.map((item, idx) => (
            <div className="mb-2 flex justify-between" key={idx}>
              <div className="flex items-center gap-2">
                <img
                  src={item?.user.avatar}
                  alt="profile-img"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h5 className="font-medium text-base leading-5">
                    {item?.user.name}
                  </h5>
                  <p className="leading-5 text-sm text-slate-400">
                    {item?.user.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm">score:</p>
                <div
                  className={`w-full badge ${
                    idx < 1
                      ? "text-white font-medium badge-accent"
                      : idx < 3
                      ? "text-white font-medium badge-primary"
                      : "badge-outline"
                  }`}
                >
                  {item?.score}
                </div>
              </div>
            </div>
          ))
        : "Currently no leaderboard.."}
    </div>
  );
};

LeaderboardSeciton.propTypes = {
  leaderboards: PropTypes.arrayOf({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }),
};

export default LeaderboardSeciton;
