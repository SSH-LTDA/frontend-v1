import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomCard from "../../components/RoomCard";
import { useAuth } from "../../contexts/AuthContext.tsx";
import useNotification from "../../hooks/useNotification.ts";
import { useService } from "../../hooks/useService.ts";
import BookingService from "../../services/BookingService.ts";
import getAccommodations from "../../services/getAccommodations.ts";
import { Accommodation } from "../../types/Accommodation.ts";

const Rooms: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const notification = useNotification();
	const [searchParams] = useSearchParams();
	const [accommodations, setAccommodations] = useState<Accommodation[]>();
	const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleCarouselChange = useCallback((roomIndex: number, imageIndex: number) => {
		setCurrentRoomIndex(roomIndex);
		setCurrentImageIndex(imageIndex);
	}, []);

	const [, doBooking] = useService(BookingService.post, {
		onData: () => {
			notification("success", "Reserva realizada com sucesso!");
			navigate("/rooms", { replace: true });
		},
		onError: (error) => {
			notification("error", error.message);
		},
	});

	useEffect(() => {
		if (user && searchParams.get("roomId") && searchParams.get("checkInDate") && searchParams.get("checkOutDate")) {
			doBooking({
				accommodationId: searchParams.get("roomId") as string,
				checkInDate: dayjs(searchParams.get("checkInDate") as string).toDate(),
				checkOutDate: dayjs(searchParams.get("checkOutDate") as string).toDate(),
				clientId: user.id,
			});
		}
	}, [user]);

	console.log(currentRoomIndex, currentImageIndex);

	async function handleSetAccommodations() {
		const accommodations = await getAccommodations();
		setAccommodations(accommodations);
	}

	useEffect(() => {
		handleSetAccommodations();
	}, []);

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold text-center mt-2 mb-4">Acomodações</h1>
			<p className="text-center mb-12">
				Cada um dos nossos quartos luminosos e repletos de luz vem com tudo o que você precisa para uma estadia
				confortável. E sim, o conforto não é o nosso único objetivo, também valorizamos o bom design, o mobiliário
				contemporâneo elegante complementado por os ricos tons da paleta da natureza visíveis nas janelas e terraços com
				vista para o mar dos nossos quartos.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{accommodations && accommodations.length > 0 ? (
					accommodations.map((room, index) => (
						<RoomCard key={index} room={room} roomIndex={index} onCarouselChange={handleCarouselChange} />
					))
				) : (
					<span>Desculpe, não foi possível encontrar acomodações</span>
				)}
			</div>
		</div>
	);
};

export default Rooms;
