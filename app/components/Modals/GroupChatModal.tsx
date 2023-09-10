"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { TextField } from "@mui/material";
import Select from "../Select/index";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { Controller } from "react-hook-form";
interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users = [],
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");
  const [isCheck, setIsCheck] = useState(false);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data) {
      setIsCheck(false);
      return;
    }
    setIsCheck(true);
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        if (res.data.status === 400 && res.data.message) {
          toast.error(res.data.message);
        } else if (
          res.data.status !== 400 ||
          res.data.status !== 500 ||
          res.data.status !== 401
        ) {
          router.refresh();
          onClose();
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
        resetData();
      });
  };
  const handleClose = () => {
    onClose();
    resetData();
  };
  const resetData = () => {
    reset();
    setIsCheck(false);
  };
  const onConfirm = () => {
    isCheck && onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    className="focus:ring-rose-500"
                    {...field}
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    error={!!errors.name}
                    size="small"
                    type="text"
                    helperText={errors.name ? "Please enter the name." : ""}
                  />
                )}
              ></Controller>
              <Controller
                name="members"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    disabled={isLoading}
                    label="Members"
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                    onChange={(value) =>
                      setValue("members", value, {
                        shouldValidate: true,
                      })
                    }
                    value={members}
                    error={!!errors.members}
                    helperText={"Please select an option."}
                  />
                )}
              ></Controller>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            color="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={onConfirm} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
