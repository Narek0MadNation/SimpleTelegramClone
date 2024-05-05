import { userProps } from "@/types";
import { FlashIcon } from "@/utils/icons";
import Image from "next/image";
import React from "react";
import CallButton from "./CallButton";

const Topbar = ({ selecteduser }: { selecteduser: userProps }) => {
  const handleClick = () => {
    document.querySelector(".messages")?.classList.add("hidden");
    document.querySelector(".sidebar")?.classList.remove("hidden");
  };

  return (
    <div className={`bg-white ${selecteduser ? " " : "md:hidden"}`}>
      <div className="w-full px-10 py-3 flex justify-between items-center">
        <div className="flex gap-3">
          <button onClick={handleClick} className="md:hidden">
            <FlashIcon />
          </button>
          <div className="avatar ml-r cursor-auto">
            <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={selecteduser?.imageId || ""}
                width={256}
                height={256}
                alt="avatar"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="font-semibold text-black text-md">
              {selecteduser?.name}
            </h3>
            <p className="text-[#707991">online</p>
          </div>
        </div>
        <CallButton />
      </div>
    </div>
  );
};

export default Topbar;
