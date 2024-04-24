"use client";
import Image from "next/image";

import link from "../assets/icons/link.svg";
import store from "../assets/icons/store.svg";
import media from "../assets/icons/media.svg";
import invoice from "../assets/icons/invoice.svg";

const Sidebar = () => {
  const boxShadow =
    "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)";
  return (
    <div className="fixed top-[76px] h-[calc(100vh-76px)] md:flex items-center px-5 cursor-pointer hidden">
      <div
        style={{ boxShadow }}
        className="flex flex-col shrink-0 bg-white rounded-full gap-2 p-1"
      >
        <div className="flex items-center grayscale hover:grayscale-0 hover:bg-[#EFF1F6] rounded-full h-10 p-2">
          <Image src={link} alt="icon" />
        </div>

        <div className="flex items-center grayscale hover:grayscale-0 hover:bg-[#EFF1F6] rounded-full h-10 p-2">
          <Image src={store} alt="icon" />
        </div>

        <div className="flex items-center grayscale hover:grayscale-0 hover:bg-[#EFF1F6] rounded-full h-10 p-2">
          <Image src={media} alt="icon" />
        </div>

        <div className="flex items-center grayscale hover:grayscale-0 hover:bg-[#EFF1F6] rounded-full h-10 p-2">
          <Image src={invoice} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
