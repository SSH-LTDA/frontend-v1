import React from "react";
import { RiFacebookFill, RiGoogleFill, RiInstagramFill } from "react-icons/ri";

function Footer() {
  return (
    <footer>
      <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[50px] border-b-[#886023] border-solid m-auto"></div>
      <div className="bg-[#886023] w-[full] flex justify-evenly py-14 text-white max-[850px]:flex-col max-[850px]:items-center max-[850px]:gap-8 max-[850px]:text-center">
        <div>
          <h4 className="text-3xl font-bold w-full">Pousada Quinta do Ypuã</h4>
          <p>Estrada Ipua, nº 6 </p>
          <p>Laguna - SC | 88790-000</p>
          <p className="font-semibold">(48) 99940-9732 | pousadaquintadoypua@gmail.com</p>
        </div>
        <div>
          <ul className="h-full flex flex-col justify-between font-semibold">
            <li className="cursor-pointer" onClick={() => window.location.assign("/contact-us")}>Contato</li>
            <li className="cursor-pointer">Sobre nós</li>
            <li className="cursor-pointer">Termos e Condições</li>
          </ul>
        </div>
        <div>
          <ul className="h-full flex flex-col justify-between font-semibold w-full">
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => window.open("https://www.instagram.com/pousadaquintadoypua/")}><RiInstagramFill size={20} /> Instagram</li>
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => window.open("https://www.google.com.br/travel/hotels/entity/CgoIh9jHt_yj0pIqEAE")}><RiGoogleFill size={20} /> Google</li>
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => window.open("https://www.facebook.com/pousadaquintadoypua/")}><RiFacebookFill size={20} /> Facebook</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
