"use client";

import ReactSelect from "react-select";
import "./style.css";
import clsx from "clsx";
interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}
const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
  error,
  helperText,
}) => {
  console.log("error", error);

  return (
    <div className="z-[100]">
      <label
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          isSearchable
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          className={clsx(
            {
              control: () => "text-sm",
            },
            error ? "error" : ""
          )}
        />
        {error && (
          <p className="mui-tavw7u-MuiFormHelperText-root Mui-error">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Select;
