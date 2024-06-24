import PropTypes from "prop-types";

const AddThreadButton = (props) => {
  const { label, handleShowModal } = props;
  return (
    <div>
      <button
        className="btn h-fit min-h-fit w-full py-1 text-lg rounded-md bg-blue-400 text-white hover:bg-blue-500"
        onClick={handleShowModal}
      >
        {label}
      </button>
    </div>
  );
};

AddThreadButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleShowModal: PropTypes.func.isRequired,
};

export default AddThreadButton;
