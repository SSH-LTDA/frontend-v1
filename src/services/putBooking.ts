import { request } from "../helpers/request.ts";
import { Booking } from "../types/Booking";

function putBooking({ id, data }: { id: string; data: Booking }): Promise<Booking> {
	return request({ method: "PUT", url: `bookings/${id}`, data });
}

export default putBooking;
