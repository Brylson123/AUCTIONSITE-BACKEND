import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { AddOfferResponse, OfferInterface } from '../../interfaces/offer';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { AddOfferDto } from './dto/dto';
import { Offers } from './offers.entity';
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';

@Controller('offers')
export class OffersController {
  constructor(@Inject(OffersService) private offersService: OffersService) {}

  @Get('/:name?')
  async getOffers(@Param('name') name: string): Promise<OfferInterface[]> {
    return await this.offersService.getOffers(name ?? '');
  }

  @Get('/offer/:id')
  async getOneOffer(@Param('id') id: string): Promise<Offers> {
    return await this.offersService.getOne(id);
  }

  @Post('/add')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'product-photos')) },
    ),
  )
  addOffer(
    @Body() req: AddOfferDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<OfferInterface> {
    return this.offersService.add(req, files);
  }

  @Get('/photo/:id')
  async getPhoto(@Param('id') id: string, @Res() res: any): Promise<any> {
    return this.offersService.getPhoto(id, res);
  }
}
