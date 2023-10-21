import { Injectable } from '@nestjs/common';
import { OfferInterface } from '../../interfaces/offer';
import { Offers } from './offers.entity';
import { AddOfferDto } from './dto/dto';

@Injectable()
export class OffersService {
  filter(offers: Offers): OfferInterface {
    const { id, price, description, name } = offers;
    return { id, price, description, name };
  }

  async getoOffers(): Promise<OfferInterface[]> {
    return (await Offers.find()).map(this.filter);
  }

  async add(newOffer: AddOfferDto) {
    const offer = new Offers();
    offer.id = newOffer.id;
    offer.price = newOffer.price;
    offer.description = newOffer.description;
    offer.name = newOffer.name;

    await offer.save();

    return this.filter(offer);
  }
}
