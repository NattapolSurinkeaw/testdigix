import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/SidebarData";

export default function Sidebar({sidebar}) {
    const [storeSubmenu, setStoreSubmenu] = useState("close");

    function toggleStoreSubmenu() {
        storeSubmenu === "open" ? setStoreSubmenu("close") : setStoreSubmenu("open");
    }
  return (
    <div className="w-full h-full text-white font-bold">
      <div className="flex justify-between items-center text-center w-full p-4">
        <figure className="w-full">
          <img className="w-20 h-20" src="/src/public/images/hero.png" alt="logo" />
        </figure>
        {sidebar === "open" && <p className="w-full">Book Library</p>}
      </div>
      <hr
        className={`${
          sidebar === "open" ? "w-[268px]" : "w-[45px]"
        } m-auto transition-all ease-in-out duration-300`}
      />
      <div className="flex flex-col p-3 gap-2">
        {/* Dashboard */}
        {SidebarData.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            {sidebar === "open" && <p className="capitalize">{Object.keys(section)[0]}</p>}
            {Object.values(section)[0].map((menu, index) => (
              <div key={index}>
                <Link
                  to={menu.path}
                  className={`flex ${
                    sidebar === "close" && "justify-center"
                  } items-center gap-2 p-2 w-full rounded-md transition-all ease-in-out duration-300 hover:bg-gray-500`}
                >
                  {menu.icon}
                  {sidebar === "open" && menu.title}
                </Link>
              </div>
            ))}
          </div>
        ))}
        <hr
          className={`${
            sidebar === "open" ? "w-[268px]" : "w-[45px]"
          } m-auto transition-all ease-in-out duration-300`}
        />

        {/* System */}
        {SidebarData.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            {sidebar === "open" && <p className="capitalize">{Object.keys(section)[1]}</p>}
            {Object.values(section)[1].map((menu, index) => (
              <div key={index} className="flex flex-col">
                <Link
                  to={menu.path}
                  onClick={menu.submenus ? toggleStoreSubmenu : null}
                  className={`flex ${
                    sidebar === "open" ? "justify-between gap-2" : "justify-center gap-0"
                  } items-center p-2 w-full max-h-[40px] rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-500`}
                >
                  <div className="flex items-center gap-2">
                    {menu.icon}
                    {sidebar === "open" && menu.title}
                  </div>
                  <div
                    className={`${
                      storeSubmenu === "open" && "transform scale-y-[-1]"
                    } transition-all ease-in-out duration-300`}
                  >
                    {sidebar === "open" && menu.submenus && <KeyboardArrowDownIcon />}
                  </div>
                </Link>
                {/* System Submenu */}
                <div
                  className={`flex flex-col ${
                    menu.submenus && storeSubmenu === "open" ? "h-20" : "h-0"
                  } overflow-hidden transition-all ease-in-out duration-300`}
                >
                  {menu.submenus?.map((submenu, index) => (
                    <Link
                      key={index}
                      to={submenu.path}
                      className={`flex items-center ${
                        sidebar === "close" ? "justify-center pl-0" : "pl-8"
                      } gap-2 py-2 rounded-md transition-all ease-in-out duration-300 hover:bg-gray-500`}
                    >
                      {submenu.icon}
                      {sidebar === "open" && submenu.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <hr
          className={`${
            sidebar === "open" ? "w-[268px]" : "w-[45px]"
          } m-auto transition-all ease-in-out duration-300`}
        />

        {/* Content */}
        {/* {SidebarData.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            {sidebar === "open" && <p className="capitalize">{Object.keys(section)[2]}</p>}
            {Object.values(section)[2].map((menu, index) => (
              <div key={index}>
                <Link
                  to={menu.path}
                  className={`flex ${
                    sidebar === "close" && "justify-center"
                  } items-center gap-2 p-2 w-full rounded-md transition-all ease-in-out duration-300 hover:bg-gray-500`}
                >
                  {menu.icon}
                  {sidebar === "open" && menu.title}
                </Link>
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </div>
  )
}
