import { api } from "../config/axios";

export default function deleteAccomodation(id: string): Promise<number> {
  return api.delete(`accomodation/${id}`).then(
    (response) => {
      return response.status;
    },
    (error) => {
      return error.response.status;
    }
  );
}
