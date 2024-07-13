import React from "react";

interface FormSuccessProps {
  message: string;
}

const FormError = ({ message }: FormSuccessProps) => {
  if (message)
    return (
      <div
        className={"rounded-md border bg-red-500 p-2 text-center text-white"}
      >
        {message}
      </div>
    );
};

export default FormError;