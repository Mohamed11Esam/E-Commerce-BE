import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactory } from './factory';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactory: AuthFactory,
  ) {}

  @Post('register')
  // @UseFilters(HttpExceptionFilter)
  async register(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactory.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'Registration successful',
      success: true,
      customer: createdCustomer,
    };
  }

  @Post('confirm-otp')
  async confirmOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.confirmOtp(body.email, body.otp);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return {
      message: 'Login successful',
      success: true,
      token,
    };
  }

  @Post('google')
  async googleAuth(@Body('idToken') idToken: string) {
    const { user, token } = await this.authService.googleLogin(idToken);
    return {
      message: 'Google login successful',
      success: true,
      data: { user, token },
    };
  }
}
