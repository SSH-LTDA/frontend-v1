import { api } from "../config/axios";
import { Booking } from "../types/Booking";

export default function getBookingById(id: string): Promise<Booking> {
  return api.get(`booking/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
