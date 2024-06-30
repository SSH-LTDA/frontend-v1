import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaInfoCircle, FaDollarSign } from "react-icons/fa";
import RoomDetailsModal from "./RoomDetailsModal";

interface Room {
	title: string;
	images: string[];
	price: number;
	beds: number;
	guests: number;
	description: string;
	amenities: string[];
}

interface RoomCardProps {
	room: Room;
	roomIndex: number;
	onCarouselChange: (roomIndex: number, imageIndex: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, roomIndex, onCarouselChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewDetails = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="border rounded-lg shadow-lg overflow-hidden w-full lg:w-5/5 mx-auto">
				<Carousel showThumbs={false} onChange={(index) => onCarouselChange(roomIndex, index)}>
					{room.images.map((src, idx) => (
						<div key={idx}>
							<img src={src} alt={room.title} className="w-full h-auto" />
						</div>
					))}
				</Carousel>
				<div className="p-4">
					<h2 className="text-lg font-bold mb-2">{room.title}</h2>
					<div className="flex justify-between">
						<button
							className="flex items-center bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
							onClick={handleViewDetails}
						>
							<FaInfoCircle className="mr-1" />
							Ver detalhes
						</button>
						<button className="flex items-center bg-[#886023] text-white px-2 py-1 rounded hover:bg-[#64491f]">
							<FaDollarSign className="mr-1" />
							{room.price} por noite
						</button>
					</div>
				</div>
			</div>
			{isModalOpen && <RoomDetailsModal room={room} onClose={handleCloseModal} />}
		</>
	);
};

export default RoomCard;
