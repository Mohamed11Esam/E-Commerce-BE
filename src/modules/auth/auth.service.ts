import { ConflictException, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../models';
import { CustomerEntity } from './entities/auth.entity';
import { sendMailHelper } from '@common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async register(customer: CustomerEntity) {
    const customerExists = await this.customerRepository.findOne({ email: customer.email }, {}, {});
    if (customerExists) {
      throw new ConflictException('Customer already exists');
    }
    const createdCustomer = await this.customerRepository.create(customer);
    await sendMailHelper({
      to: customer.email,
      subject: 'Confirmation Email',
      html: `<h1>Your OTP is ${customer.otp}</h1>`,
    });
    const { password, otp, otpExpiration, ...result } = JSON.parse(JSON.stringify(createdCustomer));
    return result as CustomerEntity;
  }

}
