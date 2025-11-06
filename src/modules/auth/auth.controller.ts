import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactory } from './factory';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly authFactory: AuthFactory) {}

  @Post('register')
  // @UseFilters(HttpExceptionFilter)
  async register(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactory.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer);
    return {message: 'Registration successful', success: true, customer: createdCustomer};
  }
}
