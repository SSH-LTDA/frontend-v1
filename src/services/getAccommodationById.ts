import { Accommodation } from "../types/Accommodation";
import { request } from "../helpers/request.ts";

function getAccommodationById(id: string): Promise<Accommodation> {
	return request({ method: "GET", url: `accommodations/${id}` });
}

export default getAccommodationById;
