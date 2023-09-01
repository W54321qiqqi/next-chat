"use client";
import { TextField, Button } from "@mui/material";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import React from "react";
import { Controller } from "react-hook-form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  Control,
  FieldErrors,
} from "react-hook-form";
type Variant = "LOGIN" | "REGISTER";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  disabled: boolean;
  variant: Variant;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
const Form: React.FC<LoginFormProps> = ({
  onSubmit,
  disabled,
  variant,
  handleSubmit,
  control,
  errors,
}) => {
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {variant === "REGISTER" && (
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="name"
              label="Name"
              disabled={disabled}
              error={!!errors.name}
              size="small"
              helperText={errors.name ? "Please enter the name." : ""}
            />
          )}
        ></Controller>
      )}
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: emailRegex }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            id="email"
            label="Email address"
            disabled={disabled}
            error={!!errors.email}
            size="small"
            helperText={
              errors.email ? "Please enter the correct email address." : ""
            }
          />
        )}
      ></Controller>
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            fullWidth
            {...field}
            id="password"
            label="Password"
            disabled={disabled}
            error={!!errors.password}
            size="small"
            type="password"
            helperText={errors.password ? "Please enter the poassword." : ""}
          />
        )}
      ></Controller>
      <Button
        variant="outlined"
        startIcon={<AddToHomeScreenIcon />}
        fullWidth
        disabled={disabled}
        className="mt-2 sm:mt-2"
        type="submit"
      >
        {variant === "LOGIN" ? "Sign in" : "Register"}
      </Button>
    </form>
  );
};
export default Form;
