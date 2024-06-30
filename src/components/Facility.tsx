import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface FacilityProps {
	name: string;
	icon: React.ReactNode;
	description: string;
	image: string;
}

const Facility: React.FC<FacilityProps> = ({ name, icon, description, image }) => {
	return (
		<div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md bg-[#f8f4ec]">
			<Carousel showThumbs={false} showArrows={true} infiniteLoop autoPlay interval={3000}>
				{[
					<div key={name}>
						<img src={image} alt={name} className="w-full h-64 object-cover rounded-lg mb-4" />
					</div>,
				]}
			</Carousel>
			<div className="text-3xl text-[#000000] mb-2">{icon}</div>
			<div className="text-lg font-medium mb-2 text-[#000000]">{name}</div>
			<p className="text-center text-sm text-gray-700">{description}</p>
		</div>
	);
};

export default Facility;
