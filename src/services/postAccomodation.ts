import { api } from "../config/axios";
import { Accommodation } from "../types/Accommodation";

export default function postAccommodation(body: Accommodation): Promise<Accommodation> {
  return api.post(`accommodation`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}