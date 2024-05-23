import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CupomService } from './cupom.service';
import { CreateCupomDto } from './dto/create-cupom.dto';
import { UpdateCupomDto } from './dto/update-cupom.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('cupom')
export class CupomController {
  constructor(private readonly cupomService: CupomService) {}

  @Post()
  create(@Body() createCupomDto: CreateCupomDto) {
    return this.cupomService.create(createCupomDto);
  }

  @Get()
  findAll() {
    return this.cupomService.findAll();
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.cupomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCupomDto: UpdateCupomDto) {
    return this.cupomService.update(+id, updateCupomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cupomService.remove(+id);
  }
}
