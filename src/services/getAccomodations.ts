import { api } from "../config/axios";
import { Accomodation } from "../types/Accomodation";

export default function getAccomodations(): Promise<Accomodation[]> {
  return api.get(`accomodations`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.status;
    }
  );
}
