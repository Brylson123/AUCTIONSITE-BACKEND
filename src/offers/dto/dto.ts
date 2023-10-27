import { IsNumber, IsString, Max, Min } from 'class-validator';

export class AddOfferDto {
  @IsString()
  @Max(999)
  description: string;
  @IsString()
  @Max(99)
  name: string;
  @IsNumber()
  @Min(1)
  price: number;
}
