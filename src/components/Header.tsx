import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pathname = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const haveImage = useMemo(() => {
    return pathname === "/" || pathname === "/facilities" || pathname === "/rooms";
  }, [pathname]);

  return (
    <header className={`${haveImage ? "h-[100vh]" : "h-auto"} flex z-0 flex-wrap`}>
      <nav className="w-full h-[15.5vh] bg-white flex justify-around items-center z-10 shadow-xl px-10">
        <img
          src="https://static.wixstatic.com/media/b87f83_9f4625b043a944daaf5fddefc7d73d0e~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_auto/logo-pousada-quinta-do-ypua.png"
          alt="Logo Quinta do Ypuã"
          className="min-h-[80%] my-auto p-3 object-cover"
        />
        <ul className="flex gap-10 text-md font-serif">
          {menuLinks.map((menuLink, index) => (
            <li key={index} {...(pathname === menuLink.to && { className: "font-bold text-[#7E2726]" })}>
              <Link to={menuLink.to} className="hover:text-[#b3753c] transition-colors">
                {menuLink.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative">
          <FaUserCircle
            size={40}
            className="cursor-pointer text-[#b3753c] hover:text-[#886023] transition-colors"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border rounded shadow-lg">
              {localStorage.getItem("userData") ? (
                <>
                  <Link
                    to="/user-info"
                    className="block px-4 py-2 text-gray-800 hover:bg-[#f8f4ec] hover:text-[#64491f] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Perfil
                  </Link>
                  {localStorage.getItem("userData") === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#f8f4ec] hover:text-[#64491f] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Página de Administração
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-[#f8f4ec] hover:text-[#64491f] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-[#f8f4ec] hover:text-[#64491f] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Cadastro
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      {haveImage && (
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
