import { Product } from '../entities/product.entity';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto extends Product {
  id?: number;
  @IsString()
  title: string;
  @IsString()
  category: string;
  @IsString()
  picture: string;
  @IsString()
  description: string;
  @IsString()
  commands: string;
  @IsNumber()
  price: number;
}
