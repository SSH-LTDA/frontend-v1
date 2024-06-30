export interface Accommodation {
	id: string;
	type: string;
	beds: number;
	price: number;
	photos: string[];
	description: string;
	facilities: string[];
	guestCapacity: number;
}
