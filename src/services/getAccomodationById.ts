import { api } from "../config/axios";
import { Accomodation } from "../types/Accomodation";

export default function getAccomodationById(id: string): Promise<Accomodation> {
  return api.get(`accomodation/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
