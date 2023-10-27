import { Injectable } from '@nestjs/common';
import { AddOfferResponse, OfferInterface } from '../interfaces/offer';
import { Offers } from './offers.entity';
import { AddOfferDto } from './dto/dto';
import { Like } from 'typeorm';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import fs from 'fs';
import { User } from '../user/user.entity';

@Injectable()
export class OffersService {
  filter(offers: Offers): OfferInterface {
    const { id, price, description, name } = offers;
    return { id, price, description, name };
  }

  async getOffers(name: string): Promise<AddOfferResponse[]> {
    if (!name) {
      return (await Offers.find()).map(this.filter);
    }

    return (await Offers.findBy({ name: Like(`%${name}%`) })).map(this.filter);
  }

  async getOne(id: string): Promise<Offers> {
    return await Offers.findOneBy({ id });
  }

  async add(
    req: AddOfferDto,
    files: MulterDiskUploadedFiles,
    user: User,
  ): Promise<OfferInterface> {
    const photo = files?.photo?.[0] ?? null;

    console.log(photo);

    try {
      const offer = new Offers();
      offer.price = req.price;
      offer.description = req.description;
      offer.name = req.name;
      offer.user = user;

      if (photo) {
        offer.photoFn = photo.filename;
      }

      await offer.save();

      return this.filter(offer);
    } catch (e) {
      try {
        if (photo) {
          console.log(storageDir(), 'product-photos', photo.filename);
          fs.unlinkSync(
            path.join(storageDir(), 'product-photos', photo.filename),
          );
        }
      } catch (e2) {}

      throw e;
    }
  }

  async getPhoto(id: string, res: any) {
    try {
      const one = await Offers.findOneBy({ id });
      if (!one) {
        throw new Error('no object found');
      }
      if (!one.photoFn) {
        throw new Error('No photo in this entity!');
      }
      res.sendFile(one.photoFn, {
        root: path.join(storageDir(), 'product-photos'),
      });
    } catch (e) {
      throw e;
    }
  }
}
