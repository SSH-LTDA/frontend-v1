import { api } from "../config/axios";
import { Accomodation } from "../types/Accomodation";

export default function postAccomodation(body: Accomodation): Promise<Accomodation> {
  return api.post(`accomodation`, body).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
