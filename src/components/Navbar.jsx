import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUnsetAuthUser } from "../states/authUser/action";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    toast.info("Success Logout", { autoClose: 1000, pauseOnHover: false });
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 flex items-center justify-between px-4 mb-4 sha">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/echo-logo.png" alt="" className="w-6 h-6" />
        <a className="text-xl">Echo</a>
      </div>
      {authUser === null ? (
        <div className="flex items-center gap-1">
          <div
            className="px-3 py-1 rounded-md cursor-pointer border border-slate-200 hover:bg-slate-100"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
          <div
            className="px-3 py-1 rounded-md cursor-pointer border border-slate-200 bg-blue-400 text-white hover:bg-blue-500"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </div>
        </div>
      ) : (
        <div className="">
          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="profile-image" src={authUser?.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-3 text-lg pb-2 border-b border-slate-300 mb-1">
                Hi, {authUser?.name}!
              </li>
              {/* <li>
              <a>Profile</a>
            </li> */}
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
