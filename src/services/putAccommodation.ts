import { api } from "../config/axios";
import { Accommodation } from "../types/Accommodation";

export default function putAccommodation(id: string, body: Accommodation): Promise<Accommodation> {
  return api.put(`accommodation/${id}`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
