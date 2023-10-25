export interface OfferInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type AddOfferResponse = OfferInterface;
