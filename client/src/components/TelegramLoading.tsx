"use client";
import Lottie from "lottie-react";
import React from "react";
import loading from "../assets/Telegram.json";

const TelegramLoading = () => {
  return <Lottie animationData={loading} loop={true} />;
};

export default TelegramLoading;
