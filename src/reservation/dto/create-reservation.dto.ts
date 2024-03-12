import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  //@Type(() => Date)
  startDate: string;
  @IsString()
  @IsNotEmpty()
  // @Type(() => Date)
  endDate: string;
  @IsNumber()
  @IsNotEmpty()
  no_of_Guest: number;
}
