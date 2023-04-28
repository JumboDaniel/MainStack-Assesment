import React from "react";
import {
  Menu,
  Camera,
  Pen,
  Clock,
  Group,
  Taskbar,
  Video,
  Attachment,
  Bin,
  MainStackLogo,
  MenuLine
} from "./svg";
const Sidebar = () => {
  return (
    <section className="flex flex-col gap-y-36 w-[20%] px-16 border-r-2">
      <div className="flex flex-col gap-8">
        {/* logo */}
        <div>
          <MainStackLogo/>
        </div>
        {/* mainbar */}
        <section className="flex flex-col gap-3">
          <div>
            <div className="flex flex-col gap-6 text-left">
              {[
                [<Menu />, "dashboard"],
                [<Pen />, "item 1"],
                [<Group />, "item 2"],
                [<Taskbar />, "item 3"],
              ].map(([logo, link], index) => (
                <div className="flex gap-x-3 items-center" key={index}>
                  {logo}
                  <a
                    href="#"
                    className={`${
                      link == "dashboard" ? "text-[#FF5403]" : "text-black"
                    } cursor-pointer capitalize text-[16px] hover:text-[#FF5403] transition-colors ease-linear`}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>
          {/* others 1 */}
          <div className="flex flex-col gap-3 text-left mt-2">
            <h2 className="text-xs text-[#56616B]">Others 1</h2>
            <div className="flex flex-col gap-6">
              {[
                [<Camera />, "item 4"],
                [<Bin />, "item 5"],
              ].map(([logo, link], index) => (
                <div className="flex gap-x-3 items-center" key={index}>
                  {logo}
                  <a
                    href="#"
                    className={` cursor-pointer capitalize text-[16px] hover:text-[#FF5403] transition-colors ease-linear`}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>
          {/* others 2 */}
          <div className="flex flex-col gap-3 text-left mt-2">
            <h2 className="text-xs text-[#56616B]">Others 2</h2>
            <div className="flex flex-col gap-6">
              {[
                [<Video />, "item 6"],
                [<Attachment />, "item 7"],
                [<Clock />, "item 8"],
              ].map(([logo, link], index) => (
                <div className="flex gap-x-3 items-center" key={index}>
                  {logo}
                  <a
                    href="#"
                    className={` cursor-pointer capitalize text-[16px] hover:text-[#FF5403] transition-colors ease-linear`}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between font-semibold w-10/12 items-center">
        <img
          src="/src/assets/profile.png"
          title="profile"
          alt="profile"
          className="rounded-[100%]"
        />
        <p className="text-left">Blessing Daniels</p>
        
        <MenuLine/>
      </div>
    </section>
  );
};

export default Sidebar;
