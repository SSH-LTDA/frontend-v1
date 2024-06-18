import React from "react";
import HomeCard from "../../components/HomeCard";
import Testimonials from "../../components/Testimonials";
import deluxeRoom from "../../assets/deluxeRoom.jpeg"
import beach from "../../assets/beach.jpeg"

function HomeContent() {
  return (
    <div>
      <h2 className="text-2xl mt-10 mb-20 text-center">
        Todos os nossos tipos de quartos incluem café da manhã complementar
      </h2>
      <HomeCard
        title="Quartos Deluxe"
        description="Nossos quartos são projetados para transportar você em um ambiente feito para o lazer. Tire sua mente do dia a dia de casa vida e encontre um paraíso particular para você."
        image={deluxeRoom}
      />
      <HomeCard
        title="Deixe suas preocupações na areia"
        description="Amamos a vida na praia. Estar perto do oceano com acesso a uma praia de areia infinita garante um estado de espírito descontraído. Parece que o tempo parou olhando o oceano."
        image={beach}
      />
      <Testimonials />
    </div>
  );
}

export default HomeContent;
