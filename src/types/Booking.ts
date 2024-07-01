import { Accommodation } from "./Accommodation";
import { User } from "./User";

export interface Booking {
	id: string;
	checkInDate: Date;
	checkOutDate: Date;
	clientId: string;
	client?: User;
	accommodationId: string;
	accommodation?: Accommodation;
}
