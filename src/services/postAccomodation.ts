import { Accommodation } from "../types/Accommodation.ts";
import { request } from "../helpers/request.ts";

export interface NewAccommodationData {
  type: string;
  beds: number;
  price: number;
  photos: string[];
  description: string;
  facilities: string[];
  guestCapacity: number;
}

async function postAccommodation(data: NewAccommodationData): Promise<Accommodation> {
  return request({ method: "POST", url: "accommodations", data });
}

export default postAccommodation;
