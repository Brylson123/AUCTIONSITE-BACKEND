import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { OfferInterface } from '../interfaces/offer';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { AddOfferDto } from './dto/dto';
import { Offers } from './offers.entity';
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';

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
  @UseGuards(AuthGuard('jwt'))
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
    @UserObj() user: User,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<OfferInterface> {
    return this.offersService.add(req, files, user);
  }

  @Delete('/buy/:id')
  buyOffer(@Param('id') id: string): Promise<Offers> {
    return this.offersService.buyOffer(id);
  }
  @Get('/photo/:id')
  async getPhoto(@Param('id') id: string, @Res() res: any): Promise<any> {
    return this.offersService.getPhoto(id, res);
  }
}
