import React from "react";
import { FaWifi, FaTv, FaShower, FaSnowflake } from "react-icons/fa";
import { MdBathtub, MdLocalLaundryService } from "react-icons/md";
import { LuRefrigerator } from "react-icons/lu";
import { PiForkKnifeFill } from "react-icons/pi";
import Facility from '../../components/Facility';

import wifiImage from "../../assets/wifi.jpg";
import tvImage from "../../assets/tv.jpg";
import duchaImage from "../../assets/ducha.jpg";
import arCondicionadoImage from "../../assets/ar-condicionado.jpg";
import frigobarImage from "../../assets/frigobar.jpg";
import toalhaImage from "../../assets/toalha.jpg";
import cozinhaImage from "../../assets/cozinha.jpg";
import banheiraImage from "../../assets/banheira.jpg";

const facilities = [
  { name: "Wi-Fi", icon: <FaWifi />, description: "Conexão Wi-Fi gratuita em todas as áreas da pousada para sua comodidade.", image: wifiImage },
  { name: "TV", icon: <FaTv />, description: "Televisores de tela plana em todos os quartos com acesso a canais locais e a cabo.", image: tvImage },
  { name: "Ducha", icon: <FaShower />, description: "Duchas de alta pressão disponíveis em todos os banheiros das acomodações.", image: duchaImage },
  { name: "Ar-condicionado", icon: <FaSnowflake />, description: "Ar-condicionado em todas as acomodações para seu conforto durante a estadia.", image: arCondicionadoImage },
  { name: "Frigobar", icon: <LuRefrigerator />, description: "Frigobar em cada quarto, abastecido com bebidas e snacks variados.", image: frigobarImage },
  { name: "Toalha", icon: <MdLocalLaundryService />, description: "Serviço de lavanderia disponível para manter suas roupas sempre limpas.", image: toalhaImage },
  { name: "Cozinha", icon: <PiForkKnifeFill />, description: "Cozinha compartilhada totalmente equipada para preparo de refeições.", image: cozinhaImage },
  { name: "Banheira", icon: <MdBathtub />, description: "Banheiras disponíveis em suítes selecionadas para relaxamento total.", image: banheiraImage },
];

const Facilities: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#000000]">Instalações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <Facility 
              key={index}
              name={facility.name}
              icon={facility.icon}
              description={facility.description}
              image={facility.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
