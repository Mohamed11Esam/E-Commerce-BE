import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthGuard } from '@common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [UserMongoModule],
  controllers: [CustomerController],
  providers: [CustomerService, AuthGuard, JwtService],
})
export class CustomerModule {}
