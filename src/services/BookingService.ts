import { request } from "../helpers/request.ts";
import { Booking } from "../types/Booking.ts";

type Post = {
	checkInDate: Date;
	checkOutDate: Date;
	accommodationId: string;
	clientId: string;
};

class BookingService {
	async post(data: Post): Promise<Booking> {
		return request({ method: "post", url: "bookings", data });
	}
}

export default new BookingService();
