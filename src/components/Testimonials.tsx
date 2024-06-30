import React, { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Row from "./Row";

const testimonials = [
	{
		name: "Matheus Mello",
		text: "Calma, Serena, Retrô - Que maneira de relaxar e aproveitar.",
		date: "25/04/2024",
	},
	{
		name: "Igor Ribeiro",
		text: "Gostei muito do lugar!",
		date: "19/03/2024",
	},
	{
		name: "Igor Rosiak",
		text: "Tive um ótimo atendimento, os responsáveis pela minha estadia foram muito cuidadosos comigo.",
		date: "03/11/2023",
	},
	{
		name: "Ismael Teixeira",
		text: "Muito aconchegante e um ambiente familiar, recomendo.",
		date: "12/09/2023",
	},
];

const arrowStyles: CSSProperties = {
	zIndex: 2,
	width: 50,
	height: 50,
	fontSize: "35px",
	cursor: "pointer",
	position: "absolute",
	top: "calc(50% - 1px)",
};

const Testimonials = () => {
	return (
		<Row className="mx-auto my-20 flex-col justify-center items-center">
			<h3 className="text-5xl font-bold mb-2 text-center">Avaliações</h3>
			<Carousel
				autoPlay
				showArrows
				infiniteLoop
				showIndicators={false}
				showStatus={false}
				interval={3000}
				renderArrowPrev={(onClickHandler, _, label) => (
					<button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: "2rem" }}>
						&lt;
					</button>
				)}
				renderArrowNext={(onClickHandler, _, label) => (
					<button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: "2rem" }}>
						&gt;
					</button>
				)}
			>
				{testimonials.map((testimonial) => (
					<div className="w-[80%] mx-auto max-[500px]:w-[50%]">
						<p className="font-semibold text-xl mt-16 mb-3">"{testimonial.text}"</p>
						<span>
							{testimonial.name} - {testimonial.date}
						</span>
					</div>
				))}
			</Carousel>
		</Row>
	);
};

export default Testimonials;
