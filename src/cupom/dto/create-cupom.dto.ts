import { Cupom } from '../entities/cupom.entity';
import { IsString, IsNumber } from 'class-validator';

export class CreateCupomDto extends Cupom {
  @IsString()
  name: string;
  @IsString()
  expiresIn: string;
  @IsNumber()
  uses: number;
  @IsNumber()
  maximumUses: number;
  @IsNumber()
  discount: number;
}
