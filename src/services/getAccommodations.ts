import { api } from "../config/axios";
import { Accommodation } from "../types/Accommodation";

export default function getAccommodations(): Promise<Accommodation[]> {
  return api.get(`accommodations`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
