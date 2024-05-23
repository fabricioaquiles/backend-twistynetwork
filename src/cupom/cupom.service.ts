import { Injectable } from '@nestjs/common';
import { CreateCupomDto } from './dto/create-cupom.dto';
import { UpdateCupomDto } from './dto/update-cupom.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CupomService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCupomDto: CreateCupomDto) {
    const data = {
      ...createCupomDto,
    };

    const createCupom = this.prismaService.cupom.create({ data });
    return createCupom;
  }

  findAll() {
    return this.prismaService.cupom.findMany();
  }

  findOne(id: number) {
    return this.prismaService.cupom.findFirst({ where: { id } });
  }

  update(id: number, updateCupomDto: UpdateCupomDto) {
    this.prismaService.cupom.update({
      where: { id },
      data: { ...updateCupomDto },
    });
    return `This action updates a #${id} cupom`;
  }

  remove(id: number) {
    this.prismaService.cupom.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} cupom`;
  }
}
