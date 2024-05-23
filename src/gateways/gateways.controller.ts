import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @IsPublic()
  @Post('notification/mercadopago')
  @HttpCode(HttpStatus.OK)
  async validateMP(@Req() req) {
    return this.gatewaysService.validateMP(req);
  }

  @IsPublic()
  @Get('preference/mercadopago')
  @HttpCode(HttpStatus.OK)
  async preferenceMP(@Req() req) {
    return this.gatewaysService.preferenceMP(req);
  }

  @IsPublic()
  @Get('preference/paypal')
  @HttpCode(HttpStatus.OK)
  async preferencePP(@Req() req) {
    return this.gatewaysService.preferencePP(req);
  }
}
