import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { AddOfferResponse, OfferInterface } from '../../interfaces/offer';
import { AddOfferDto } from './dto/dto';

@Controller('offers')
export class OffersController {
  constructor(@Inject(OffersService) private offersService: OffersService) {}

  @Get('/')
  async getOffers(): Promise<OfferInterface[]> {
    return await this.offersService.getoOffers();
  }

  @Post('/')
  addOffer(@Body() newOffer: AddOfferDto): Promise<AddOfferResponse> {
    return this.offersService.add(newOffer);
  }
}
