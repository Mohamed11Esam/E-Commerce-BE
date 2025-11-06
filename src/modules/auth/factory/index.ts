import { hash } from "bcrypt";
import { RegisterDto } from "../dto/register.dto";
import { CustomerEntity } from "../entities/auth.entity";
import { generateOTP } from "@common/helpers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactory {
    async createCustomer(registerDto: RegisterDto) {
        const customer = new CustomerEntity();
        customer.userName = registerDto.userName;
        customer.email = registerDto.email;
        customer.password = await hash(registerDto.password, 10);
        customer.dob = registerDto.dob;
        customer.otp = generateOTP();
        customer.otpExpiration = new Date(Date.now() + 10 * 60000); // 10 minutes from now
        customer.isVerified = false;
        return customer;
    }
}