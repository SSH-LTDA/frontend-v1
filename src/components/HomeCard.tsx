import React from "react";
import Row from "./Row";

interface HomeCardProps {
  title: string;
  description: string;
  image: string;
  isReverse?: boolean;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, description, image, isReverse }) => {
  return (
    <Row
      className={`w-[85vw] mx-auto my-20 flex justify-between border-[#14274A] max-[768px]:w-[95vw] ${isReverse ? "border-l-2 pl-6" : "flex-row-reverse border-r-2 pr-6 border-[#14274A]"} `}
    >
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
