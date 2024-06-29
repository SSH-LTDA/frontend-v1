import { api } from "../config/axios";

export default function deleteAccommodation(id: string): Promise<number> {
  return api.delete(`accommodation/${id}`).then(
    (response) => {
      return response.status;
    },
    (error) => {
      return error.response.status;
    }
  );
}
