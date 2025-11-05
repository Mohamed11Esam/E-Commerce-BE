import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { CustomerRepository } from '../../models';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  register(registerDto: RegisterDto) {
    return this.customerRepository.create(registerDto);
  }

}
