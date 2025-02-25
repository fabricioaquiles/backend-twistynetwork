import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GatewaysModule } from './gateways/gateways.module';
import { PaymentsModule } from './payments/payments.module';
import { CupomModule } from './cupom/cupom.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    GatewaysModule,
    PaymentsModule,
    CupomModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
