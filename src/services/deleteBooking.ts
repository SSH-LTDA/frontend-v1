import { api } from "../config/axios";

export default function deleteBooking(id: string): Promise<number> {
	return api.delete(`bookings/${id}`).then(
		(response) => {
			return response.status;
		},
		(error) => {
			return error.response.status;
		}
	);
}
