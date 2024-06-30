import { Accommodation } from "../types/Accommodation.ts";
import { request } from "../helpers/request.ts";

async function putAccommodation({id, data}: {id: string, data: Accommodation}): Promise<Accommodation> {
	return request({ method: "PUT", url: `accommodations/${id}`, data });
}

export default putAccommodation;

