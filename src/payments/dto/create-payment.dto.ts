import { Payment } from '../entities/payment.entity';
import { IsString } from 'class-validator';
export class CreatePaymentDto extends Payment {
  id?: number;

  @IsString()
  code: string;

  @IsString()
  status: string;

  @IsString()
  amount: string;

  @IsString()
  gross: string;

  @IsString()
  reference: string;
}
