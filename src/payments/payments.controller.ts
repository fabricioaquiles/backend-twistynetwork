import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  @IsPublic()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
}
