import React from "react";
import Row from "./Row";

interface HomeCardProps {
  title: string;
  description: string;
  image: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, description, image }) => {
  return (
    <Row className="w-[85%] mx-auto my-20 flex justify-between border-l-2 border-[#14274A] pl-6">
      <div className="w-[48%] my-auto">
        <h3 className="text-5xl font-bold mb-2">{title}</h3>
        <p className="text-lg my-5">{description}</p>
        <button className="bg-[#E0B973] text-white text-lg font-semibold px-10 py-2 rounded-lg">EXPLORAR</button>
      </div>
      <div className="w-[48%]">
        <img src={image} alt="" className="w-[100%] h-[100%]" />
      </div>
    </Row>
  );
};

export default HomeCard;
