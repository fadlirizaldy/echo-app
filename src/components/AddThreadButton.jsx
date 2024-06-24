import PropTypes from "prop-types";

const AddThreadButton = (props) => {
  const { label, handleShowModal, className } = props;
  return (
    <div>
      <button
        className={`btn h-fit min-h-fit w-full py-1 text-lg rounded-md text-white ${className ? className : "bg-blue-400 hover:bg-blue-500"}`}
        onClick={handleShowModal}
      >
        {label}
      </button>
    </div>
  );
};

AddThreadButton.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleShowModal: PropTypes.func.isRequired,
};

export default AddThreadButton;
