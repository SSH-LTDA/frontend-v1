import { request } from "../../helpers/request.ts";

interface CreateCheckoutSession {
  room: {
    title: string;
    description: string;
    images: string[];
    price: number;
  };
  checkInDate: Date;
  checkOutDate: Date;
}

async function generateCheckoutSession(data: CreateCheckoutSession): Promise<{ url: string }> {
  return request({ method: "POST", url: "stripe/create-checkout-session", data });
}

export default generateCheckoutSession;
