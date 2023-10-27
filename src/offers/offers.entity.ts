import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OfferInterface } from '../interfaces/offer';
import { User } from '../user/user.entity';

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
    nullable: true,
  })
  photoFn: string;

  @ManyToOne((type) => User, (entity) => entity.UserOffers)
  @JoinColumn()
  user: User;
}
