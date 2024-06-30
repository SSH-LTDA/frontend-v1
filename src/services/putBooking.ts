import { api } from "../config/axios";
import { Booking } from "../types/Booking";

export default function putBooking(id: string, body: Booking): Promise<Booking> {
	return api.put(`bookings/${id}`, body).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.status;
		}
	);
}
