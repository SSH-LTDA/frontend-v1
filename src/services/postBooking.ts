import { api } from "../config/axios";
import { Booking } from "../types/Booking";

export default function postBooking(body: Booking): Promise<Booking> {
  return api.post(`booking`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
