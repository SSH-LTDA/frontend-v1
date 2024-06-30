import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Booking } from "../../types/Booking";
import getBookings from "../../services/getBookings";
import deleteBooking from "../../services/deleteBooking";
import DeleteModal from "../../components/DeleteModal";
import dayjs from "dayjs";
import EditAccommodationModal from "../../components/EditBookingModal";

const Bookings: React.FC = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false);
	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
	const [editBookingId, setEditBookingId] = useState<string>("");
	const [deleteBookingId, setDeleteBookingId] = useState<string>("");

	async function handleSetBookings() {
		const bookings = await getBookings();
		setBookings(bookings);
	}

	useEffect(() => {
		handleSetBookings();
	}, []);

	useEffect(() => {
		if (editBookingId) {
			setModalEditIsOpen(true);
		}

		if (deleteBookingId) {
			setModalDeleteIsOpen(true);
		}
	}, [editBookingId, deleteBookingId]);

	function handleDeleteBooking(id: string) {
		deleteBooking(id);
		setModalDeleteIsOpen(false);
		setDeleteBookingId("");
	}

	return (
		<>
			<div className="h-[100px] py-20 bg-[#886023] w-full relative flex items-center justify-center font-bold text-white text-6xl">
				Lista de Reservas
			</div>
			<div className="flex flex-col items-center justify-center min-h-[40vh] py-[7.5vh]">
				<table className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
					<thead>
						<tr>
							<th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id</th>
							<th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Data</th>
							<th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id do Cliente</th>
							<th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id da Acomodação</th>
							<th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Opções</th>
						</tr>
					</thead>
					<tbody>
						{bookings && bookings.length > 0 ? (
							bookings.map((booking) => (
								<tr>
									<td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.id}</td>
									<td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">
										{dayjs(booking.checkInDate).format("DD-MM-YYYY")}
									</td>
									<td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.clientId}</td>
									<td className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
										{booking.accommodationId}
									</td>
									<td className="border-collapse p-[10px] border-t border-[rgb(160 160 160)] flex items-center justify-center gap-1">
										<FaRegEdit size={17} onClick={() => setEditBookingId(booking.id)} className="cursor-pointer" />
										<FaTrashAlt size={17} onClick={() => setDeleteBookingId(booking.id)} className="cursor-pointer" />
									</td>
								</tr>
							))
						) : (
							<h4 className="p-3">Não foi possivel encontrar acomodações</h4>
						)}
					</tbody>
				</table>
			</div>
			{modalEditIsOpen && (
				<EditAccommodationModal
					bookingId={editBookingId}
					closeModal={() => {
						setModalEditIsOpen(false);
						setEditBookingId("");
					}}
				/>
			)}
			{modalDeleteIsOpen && (
				<DeleteModal
					id={deleteBookingId}
					deleteFunction={handleDeleteBooking}
					cancelButton={() => {
						setModalDeleteIsOpen(false);
						setDeleteBookingId("");
					}}
					text="Tem certeza que deseja deletar essa acomodação?"
				/>
			)}
		</>
	);
};

export default Bookings;
