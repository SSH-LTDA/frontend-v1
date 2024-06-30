import React, { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBed, FaCheck, FaTimes, FaUser } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { facilities } from "../constants/facilities.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import useNotification from "../hooks/useNotification.ts";
import { useService } from "../hooks/useService.ts";
import generateCheckoutSession from "../services/Stripe/generateCheckoutSession.ts";

interface RoomDetailsModalProps {
	room: {
		id: string;
		type: string;
		beds: number;
		price: number;
		photos: string[];
		description: string;
		facilities: string[];
		guestCapacity: number;
	};
	onClose: () => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose }) => {
	const { user } = useAuth();
	const notification = useNotification();
	const navigate = useNavigate();

	const [checkInDate, setCheckInDate] = useState<Date | null>(null);
	const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onClose]);

	const [, createCheckoutSession] = useService(generateCheckoutSession, {
		onData: (data) => {
			window.location.href = data.url;
		},
	});

	const handleConfirm = useCallback(async () => {
		if (!user) {
			notification("error", "Você deve ter um usuário logado", 1000);
			setTimeout(() => navigate("/register"), 1000);
			return;
		}

		if (!room || !checkInDate || !checkOutDate) {
			notification("error", "Preencha todas as informações");
			return;
		}

		createCheckoutSession({ room, checkInDate, checkOutDate });
	}, [room, checkInDate, checkOutDate, user]);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div ref={modalRef} className="bg-white h-3/4 rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">{room.type}</h2>
					<button onClick={onClose} className="text-gray-600 hover:text-gray-900">
						<FaTimes size={24} />
					</button>
				</div>
				<Carousel showThumbs={false}>
					{room.photos.map((src, idx) => (
						<div key={idx}>
							<img src={src} alt={room.type} className="w-full h-auto" />
						</div>
					))}
				</Carousel>
				<div className="mt-4">
					<p className="mb-4">{room.description}</p>
					<div className="flex items-center mb-4">
						<FaBed className="mr-2" /> {room.beds} {room.beds > 1 ? "Camas" : "Cama"}
					</div>
					<div className="flex items-center mb-4">
						<FaUser className="mr-2" /> Acomoda {room.guestCapacity} pessoas
					</div>
					<h3 className="text-lg font-semibold mb-2">Esta acomodação contém:</h3>
					<div className="grid grid-cols-2 gap-4 mb-6">
						{room.facilities.map((amenity, index) => (
							<div key={index} className="flex items-center">
								{getAmenityTextAndIcon(amenity)?.icon} <span className="ml-2">{facilities[amenity].text}</span>
							</div>
						))}
					</div>
					<h3 className="text-lg font-semibold mb-2">Check-in e Check-out:</h3>
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div>
							<label className="block mb-2">Data de Check-in</label>
							<DatePicker
								selected={checkInDate}
								onChange={(date: Date) => setCheckInDate(date)}
								dateFormat="dd/MM/yyyy"
								className="border p-2 w-full rounded"
							/>
						</div>
						<div>
							<label className="block mb-2">Data de Check-out</label>
							<DatePicker
								selected={checkOutDate}
								onChange={(date: Date) => setCheckOutDate(date)}
								dateFormat="dd/MM/yyyy"
								className="border p-2 w-full rounded"
							/>
						</div>
					</div>
					<button
						onClick={handleConfirm}
						className="bg-[#886023] text-white px-4 py-2 mt-4 rounded hover:bg-[#64491f] flex items-center"
					>
						<FaCheck className="mr-2" /> Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};

const getAmenityTextAndIcon = (amenity: string) => {
	return facilities[amenity];
};

export default RoomDetailsModal;
