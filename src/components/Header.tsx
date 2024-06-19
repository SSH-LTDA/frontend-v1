import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

enum Paths {
  "/" = "https://static.wixstatic.com/media/b87f83_56923e1bbcc74419b614629e2930f9f8~mv2.jpg/v1/fill/w_1079,h_748,q_90/b87f83_56923e1bbcc74419b614629e2930f9f8~mv2.webp",
  "/facilities" = "https://pousada-quinta-do-ypua.hotelsantacatarina.com/data/Images/OriginalPhoto/4461/446163/446163441/image-laguna-pousada-quinta-do-ypua-21.JPEG",
  "/rooms" = "https://turismo.laguna.sc.gov.br/uploads/sites/26/2023/07/WhatsApp-Image-2023-07-13-at-16.10.28-1200x675.jpeg",
}

type MenuLink = {
  title: string;
  to: string;
};

const menuLinks: MenuLink[] = [
  {
    title: "Início",
    to: "/",
  },
  {
    title: "Facilidades",
    to: "/facilities",
  },
  {
    title: "Acomodações",
    to: "/rooms",
  },
  {
    title: "Contate-nos",
    to: "/contact-us",
  },
];

function Header() {
  const location = useLocation();

  const pathname = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const isContactUsScreen = useMemo(() => {
    return pathname === "/contact-us";
  }, [pathname]);

  return (
    <header className={`${isContactUsScreen ? "h-auto" : "h-[100vh]"} flex relative z-0 flex-wrap`}>
      <nav className="w-full h-[15.5vh] bg-white flex justify-evenly z-10 shadow-xl">
        <img
          src="https://static.wixstatic.com/media/b87f83_9f4625b043a944daaf5fddefc7d73d0e~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_auto/logo-pousada-quinta-do-ypua.png"
          alt="Logo Quinta do Ypuã"
          className="min-h-[80%] my-auto p-3 object-cover"
        />
        <ul className="flex gap-10 my-auto text-md font-serif">
          {menuLinks.map((menuLink) => (
            <li {...(pathname === menuLink.to && { className: "font-bold text-[#7E2726]" })}>
              <Link to={menuLink.to}>{menuLink.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {isContactUsScreen ? (
        <div className="h-[100px] bg-[#886023] w-full relative z-[-2px] top-0 left-0 flex items-center justify-center font-bold text-white text-6xl">
          Contate-nos
        </div>
      ) : (
        <img
          src={Paths[pathname as keyof typeof Paths]}
          className="absolute z-[-2] top-0 left-0 h-[100vh] object-cover"
          width="100%"
          alt=""
        />
      )}
    </header>
  );
}

export default Header;
