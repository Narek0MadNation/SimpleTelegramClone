import TelegramLoading from "@/components/TelegramLoading";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <TelegramLoading />
    </div>
  );
};

export default loading;
