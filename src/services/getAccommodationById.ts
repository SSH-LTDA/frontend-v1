import { api } from "../config/axios";
import { Accommodation } from "../types/Accommodation";

export default function getAccommodationById(id: string): Promise<Accommodation> {
	return api.get(`accommodations/${id}`).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.status;
		}
	);
}
