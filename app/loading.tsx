"use client";
import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className={
        "fixed z-10 flex h-full w-full items-center justify-center opacity-80"
      }
    >
      <GridLoader color="#7c3aed" />
    </div>
  );
};

export default Loading;