import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import InputText from "./InputText";
import { desc_validation, title_validation } from "../utils/inputValidation";
import { asyncAddThread } from "../states/threads/action";

const ModalNewThread = (props) => {
  const { setIsShowModal } = props;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const payload = {
      title: e.title,
      body: e.description,
    };

    dispatch(asyncAddThread(payload));
    setIsShowModal(false);
    toast.success("Posted!", { autoClose: 800, pauseOnHover: false });
  };
  return (
    <dialog id="modalNewThread" className="modal modal-open" onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-box w-11/12 max-w-xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setIsShowModal(false)}
        >
          ✕
        </button>
        <h3 className="font-bold text-xl text-center">New Thread</h3>
        <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit} key={"thread"} method="input">
          <InputText errors={errors.title} register={register} {...title_validation} />

          <InputText errors={errors.description} register={register} isTextArea {...desc_validation} />

          <div className="flex justify-end">
            <button className="btn h-fit min-h-fit px-4 py-2 text-white bg-blue-400 text-base hover:bg-blue-500">
              Post
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

ModalNewThread.propTypes = {
  setIsShowModal: PropTypes.func.isRequired,
};

export default ModalNewThread;
