import { api } from "../config/axios";

export default function deleteAccommodation(id: string): Promise<number> {
  return api.delete(`accommodations/${id}`).then(
    (response) => {
      return response.status;
    },
    (error) => {
      return error.response.status;
    }
  );
}
