import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

enum Paths {
  "/" = "/assets/home.png",
  "/facilities" = "/assets/facilities.png",
  "/rooms" = "/assets/rooms.png",
}

type MenuLink = {
  title: string;
  to: string;
};

const menuLinks: MenuLink[] = [
  {
    title: "Principal",
    to: "/",
  },
  {
    title: "Facilidades",
    to: "/facilities",
  },
  {
    title: "Quartos",
    to: "/rooms",
  },
  {
    title: "Contate-nos",
    to: "/contact-us",
  },
];

function GuestHouseName() {
  return (
    <div className="bg-[#E0B973] w-[225px] rounded-b-[50px] p-4 absolute top-0 left-40">
      <p className="font-bold text-4xl text-center">Pousada Quinta do Ypuã</p>
    </div>
  );
}

function Header() {
  const location = useLocation();

  const pathname = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const isContactUsScreen = useMemo(() => {
    return pathname === "/contact-us";
  }, [pathname]);

  return (
    <header className={`${isContactUsScreen ? "h-auto" : "h-[100vh]"} flex relative z-0 flex-wrap  p-10`}>
      {isContactUsScreen ? (
        <div className="h-[450px] bg-[#886023] w-full absolute z-[-2px] top-0 left-0 flex items-center justify-center font-bold text-white text-7xl">
          Contate-nos
        </div>
      ) : (
        <img
          src={Paths[pathname as keyof typeof Paths]}
          className="brightness-75 absolute z-[-2px] top-0 left-0 max-h-[100%]"
          width="100%"
          height={"100%"}
          alt=""
        />
      )}
      <GuestHouseName />
      <nav className="w-fit z-10 h-fit ml-auto mr-40">
        <ul className="flex gap-20 text-white font-bold">
          {menuLinks.map((menuLink) => (
            <li {...(pathname === menuLink.to && { className: "underline underline-offset-4" })}>
              <Link to={menuLink.to}>{menuLink.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
