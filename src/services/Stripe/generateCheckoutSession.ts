import { request } from "../../helpers/request.ts";

interface CreateCheckoutSession {
	room: {
		id: string;
		type: string;
		beds: number;
		price: number;
		photos: string[];
		description: string;
		facilities: string[];
		guestCapacity: number;
	};
	checkInDate: Date;
	checkOutDate: Date;
}

async function generateCheckoutSession(data: CreateCheckoutSession): Promise<{ url: string }> {
	return request({ method: "POST", url: "stripe/create-checkout-session", data });
}

export default generateCheckoutSession;
