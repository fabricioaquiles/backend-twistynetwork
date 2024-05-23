import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPaymentDto: CreatePaymentDto) {
    const data = {
      ...createPaymentDto,
    };

    const createPayment = this.prismaService.payments.create({ data });
    return createPayment;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }
}
