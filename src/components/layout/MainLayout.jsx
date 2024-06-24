import PropTypes from "prop-types";
import Navbar from "../Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
