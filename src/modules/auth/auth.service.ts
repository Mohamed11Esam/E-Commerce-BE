import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomerRepository } from '../../models';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  register(registerDto: RegisterDto) {
    return this.customerRepository.create(registerDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
