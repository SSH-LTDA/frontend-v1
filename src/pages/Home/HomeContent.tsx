import React from "react";
import HomeCard from "../../components/HomeCard";
import Testimonials from "../../components/Testimonials";
import deluxeRoom from "../../assets/deluxeRoom.jpeg";
import beach from "../../assets/beach.jpeg";

function HomeContent() {
	return (
		<div>
			<HomeCard
				title="Quartos Deluxe"
				description="Nossos quartos são projetados para transportar você em um ambiente feito para o lazer. Tire sua mente do dia a dia de casa vida e encontre um paraíso particular para você."
				image={deluxeRoom}
			/>
			<HomeCard
				title="Deixe suas preocupações na areia"
				description="Amamos a vida na praia. Estar perto do oceano com acesso a uma praia de areia infinita garante um estado de espírito descontraído. Parece que o tempo parou olhando o oceano."
				image={beach}
				isReverse
			/>
			<h3 className="text-5xl font-bold mb-10 text-center">Conheça nossa pousada</h3>
			<iframe
				width="700"
				height="350"
				src="https://www.youtube.com/embed/I8iT0OJ7Zd4?si=hCANhcq4hjySic8B"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				className="mx-auto"
			></iframe>
			<Testimonials />
		</div>
	);
}

export default HomeContent;
