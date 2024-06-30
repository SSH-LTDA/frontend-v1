import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useNotification from "../hooks/useNotification";
import { z } from "zod";
import { useService } from "../hooks/useService";
import putBooking from "../services/putBooking";
import getBookingById from "../services/getBookingById";
import { Booking } from "../types/Booking";

interface EditBookingModalProps {
	bookingId: string;
	closeModal: () => void;
}

const registerSchema = z.object({
	id: z.string().min(1, "ID inválido"),
	checkInDate: z.coerce.date(),
	checkOutDate: z.coerce.date(),
	clientId: z.string().min(1, "ID do cliente inválido"),
	accommodationId: z.string().min(1, "ID da acomodação inválido"),
});

type EditBookingFormData = z.infer<typeof registerSchema>;

const EditBookingModal: React.FC<EditBookingModalProps> = ({ bookingId, closeModal }) => {
	const notification = useNotification();
	const [defaultBooking, setDefaultBooking] = useState<Booking>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditBookingFormData>({
		resolver: zodResolver(registerSchema),
	});

	const [isEdittingBooking, doEditBooking] = useService(putBooking, {
		onData: () => {
			notification("success", "A reserva foi editada com sucesso");
			setTimeout(() => closeModal(), 2500);
		},
		onError: (error) => {
			notification("error", error.message);
		},
	});

	const [isGettingBooking, doGetBooking] = useService(getBookingById, {
		onData: (data: Booking) => {
			setDefaultBooking(data);
		},
		onError: (error) => {
			notification("error", error.message);
		},
	});

	useEffect(() => {
		doGetBooking(bookingId);
	}, []);

	const onSubmit = useCallback((data: EditBookingFormData) => {
		if (data) {
			doEditBooking({ id: bookingId, data });
		}
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white h-3/4 flex flex-col justify-between rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
				{isGettingBooking ? (
					<span>Carregando...</span>
				) : defaultBooking ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label className="block text-gray-700">Id</label>
							<input
								type="text"
								{...register("id")}
								defaultValue={defaultBooking.id}
								className="w-full p-2 border rounded"
								disabled
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Data de Check In</label>
							<input
								type="date"
								{...register("checkInDate")}
								defaultValue={defaultBooking.checkInDate.toString()}
								className="w-full p-2 border rounded"
								placeholder="Data CheckIn"
								disabled={isEdittingBooking}
							/>
							{errors.checkInDate && <p className="text-red-500 text-sm">{errors.checkInDate.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Data de Check Out</label>
							<input
								type="date"
								{...register("checkOutDate")}
								defaultValue={defaultBooking.checkOutDate.toString()}
								className="w-full p-2 border rounded"
								placeholder="Data CheckOut"
								disabled={isEdittingBooking}
							/>
							{errors.checkOutDate && <p className="text-red-500 text-sm">{errors.checkOutDate.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">ID Do Cliente</label>
							<input
								type="text"
								{...register("clientId")}
								defaultValue={defaultBooking.clientId}
								className="w-full p-2 border rounded"
								placeholder="Id do Cliente"
								disabled={isEdittingBooking}
							/>
							{errors.clientId && <p className="text-red-500 text-sm">{errors.clientId.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Id da Acomodação</label>
							<input
								type="text"
								{...register("accommodationId")}
								defaultValue={defaultBooking.accommodationId}
								className="w-full p-2 border rounded"
								placeholder="Id da Acomodação"
								disabled={isEdittingBooking}
							/>
							{errors.accommodationId && <p className="text-red-500 text-sm">{errors.accommodationId.message}</p>}
						</div>

						<div className="flex justify-end gap-5">
							<button type="button" className="bg-slate-400 px-3 py-1 text-white rounded-lg" onClick={closeModal}>
								Cancelar
							</button>
							<button
								className="bg-green-500 px-3 py-1 text-white rounded-lg"
								disabled={isEdittingBooking}
								type="submit"
							>
								Editar Reserva 
							</button>
						</div>
					</form>
				) : (
					<span>Desculpe, não foi possível encontrar essa reserva</span>
				)}
			</div>
		</div>
	);
};

export default EditBookingModal;
