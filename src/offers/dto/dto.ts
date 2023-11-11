import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddOfferDto {
  @IsString()
  @MinLength(1)
  @MaxLength(999)
  description: string;
  @IsString()
  @MaxLength(99)
  name: string;
  @IsNumber()
  @Min(1)
  price: number;
}
