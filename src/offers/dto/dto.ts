import { OfferInterface } from "../../../interfaces/offer";

export class AddOfferDto implements OfferInterface{
  description: string;
  id: string;
  name: string;
  price: number;
}