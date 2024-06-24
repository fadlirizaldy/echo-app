import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import InputText from "../components/InputText";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import {
  email_validation,
  password_validation,
} from "../utils/inputValidation";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingBar  = useSelector((states) => states.loadingBar);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (e) => {
    const payload = {
      email: e.email,
      password: e.password,
    };

    const res = await dispatch(asyncSetAuthUser(payload));

    if (res?.error) {
      setError("password", { type: "apiResponse", message: res.message });
      toast.error(res.message, { autoClose: 2500 });
    } else {
      toast.success("Success login", { autoClose: 1000, pauseOnHover: false });
      navigate("/");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="font-semibold text-xl mb-5">Login to your account</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="w-3/4 flex flex-col gap-2"
        >
          <InputText
            errors={errors.email}
            register={register}
            {...email_validation}
          />

          <InputText
            errors={errors.password}
            register={register}
            {...password_validation}
          />
          <button
            type="submit"
            className="mt-4 py-1 bg-gray-700 rounded-sm w-full text-white hover:bg-gray-800 transition-all"
            disabled={loadingBar.default > 1}
          >
            {loadingBar.default < 1 ? "Log in" : "Loading..."}
          </button>
        </form>

        <div className="mt-3">
          <h2 className="text-sm text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"} className="font-bold">
              Register
            </Link>
          </h2>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
