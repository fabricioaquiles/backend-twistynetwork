import { Module } from '@nestjs/common';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';

import { PaymentsModule } from 'src/payments/payments.module';
import { CupomModule } from 'src/cupom/cupom.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [PaymentsModule, CupomModule, ProductsModule],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
