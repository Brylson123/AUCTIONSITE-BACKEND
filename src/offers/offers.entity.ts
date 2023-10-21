import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OfferInterface } from '../../interfaces/offer';

@Entity()
export class Offers extends BaseEntity implements OfferInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 255,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @Column({
    default: null,
    nullable: null,
  })
  photoFn: string;
}
