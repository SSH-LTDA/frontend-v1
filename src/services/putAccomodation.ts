import { api } from "../config/axios";
import { Accomodation } from "../types/Accomodation";

export default function putAccomodation(id: string, body: Accomodation): Promise<Accomodation> {
  return api.put(`accomodation/${id}`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
