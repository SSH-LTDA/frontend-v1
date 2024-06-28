import { api } from "../config/axios";
import { Booking } from "../types/Booking";

export default function getBookings(): Promise<Booking[]> {
  return api.get(`bookings`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
