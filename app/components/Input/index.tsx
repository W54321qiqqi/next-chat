import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  erros: FieldErrors;
  disabled?: boolean;
  size?: "small" | "default" | "large";
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  required,
  erros,
  disabled,
  size,
}) => {
  const sizeStyle = (size: InputProps["size"]) => {
    const sizeStyleMap = {
      small: `sm:text-sm sm:leading-6`,
      default: `sm:text-md sm:leading-4`,
      large: `sm:text-lg sm:leading-8`,
    };
    return sizeStyleMap[size!];
  };
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-500
            ring-1 
            ring-inset 
          ring-gray-300 
            `,
            size ? sizeStyle(size) : `sm:text-md sm:leading-4`,
            erros[id] && `focus:ring-rose-500`,
            disabled && `opacity-50 cursor-default`
          )}
        />
      </div>
    </div>
  );
};
export default Input;
