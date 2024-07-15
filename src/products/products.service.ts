import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    const data = {
      ...createProductDto,
    };

    const createProduct = this.prismaService.products.create({ data });
    return createProduct;
  }

  findAll() {
    return this.prismaService.products.findMany({ orderBy: { id: 'desc' } });
  }

  findAllFilter(filterField: string, filterValue: string) {
    const query: any = Prisma.sql`SELECT * FROM "Products" WHERE "${filterField}" = '${filterValue}' ORDER BY id DESC;`;
    return this.prismaService.$queryRawUnsafe(query);
  }

  findOne(id: number) {
    return this.prismaService.products.findFirst({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.prismaService.products.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    this.prismaService.products.delete({
      where: { id },
    });
    return `This action removes a #${id} product`;
  }
}
