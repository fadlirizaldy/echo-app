import PropTypes from "prop-types";

const InputText = (props) => {
  const {
    id,
    label,
    name,
    placeholder,
    type = "text",
    className,
    register,
    validation,
    errors,
    isTextArea,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="font-medium text-sm text-neutral-500">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          rows={4}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`px-2 py-1 border ${
            errors && errors.type !== "apiResponse"
              ? "border-red-500"
              : "border-slate-200 focus:ring-blue-200"
          } rounded-lg bg-stone-50 focus:ring focus:outline-none ${className}`}
          {...register(name, validation)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`px-2 py-1 border ${
            errors && errors.type !== "apiResponse"
              ? "border-red-500"
              : "border-slate-200 focus:ring-blue-200"
          } rounded-lg bg-stone-50 focus:ring focus:outline-none ${className}`}
          {...register(name, validation)}
        />
      )}
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
};

const validationType = PropTypes.shape({
  required: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }),
  pattern: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(RegExp).isRequired,
      PropTypes.string.isRequired,
    ]),
    message: PropTypes.string.isRequired,
  }),
});

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  validation: validationType.isRequired,
  className: PropTypes.string,
  errors: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  register: PropTypes.func.isRequired,
  isTextArea: PropTypes.bool,
};

export default InputText;
