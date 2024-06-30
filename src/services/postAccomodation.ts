import { api } from "../config/axios";
import { Accommodation } from "../types/Accommodation";

export default function postAccommodation(body: Accommodation): Promise<Accommodation> {
  return api.post(`accommodations`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
