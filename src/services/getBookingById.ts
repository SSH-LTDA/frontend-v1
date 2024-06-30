import { request } from "../helpers/request";
import { Booking } from "../types/Booking";

export default function getBookingById(id: string): Promise<Booking> {
	return request({ method: "GET", url: `bookings/${id}` });
}
