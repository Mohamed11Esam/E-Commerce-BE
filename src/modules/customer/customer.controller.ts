import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@common/guards';
import { RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('profile')
  @Roles(['Customer', 'Admin', 'User'])
  @UseGuards(AuthGuard,  RolesGuard)
  getProfile(@Request() req: any) {
    return { message: 'Customer profile data', data:{user: req.user} };
  }
  
}
