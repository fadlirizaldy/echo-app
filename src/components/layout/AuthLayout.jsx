import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import BackgroundGradient from "../background-gradient";

const AuthLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <BackgroundGradient className="min-h-screen flex justify-center items-center p-5 md:p-0">
      <div className="bg-stone-50 rounded-md w-[720px] min-h-[400px] shadow-lg grid grid-cols-1 sm:grid-cols-2">
        <div className="h-full bg-emerald-100 rounded-s-md flex-col items-center justify-center flex p-4">
          <img src="/echo-logo.png" className="w-16 h-16 mb-4" />
          <h4 className="font-bold text-xl">Your new social media</h4>
          <p className="text-neutral-600 text-sm text-center">
            Discover the future of social networking with Echo - where
            connections are limitless and engaging!
          </p>
        </div>
        {children}
      </div>
    </BackgroundGradient>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
