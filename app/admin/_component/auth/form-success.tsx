import React from "react";

interface FormSuccessProps {
  message: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (message)
    return (
      <div
        className={
          "rounded-md border bg-emerald-500 p-2 text-center text-white"
        }
      >
        {message}
      </div>
    );
};

export default FormSuccess;