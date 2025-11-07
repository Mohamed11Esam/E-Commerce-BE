import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerRepository } from '../../models';
import { CustomerEntity } from './entities/auth.entity';
import { sendMailHelper } from '@common/helpers';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(customer: CustomerEntity) {
    const customerExists = await this.customerRepository.findOne(
      { email: customer.email },
      {},
      {},
    );
    if (customerExists) {
      throw new ConflictException('Customer already exists');
    }
    const createdCustomer = await this.customerRepository.create(customer);
    await sendMailHelper({
      to: customer.email,
      subject: 'Confirmation Email',
      html: `<h1>Your OTP is ${customer.otp}</h1>`,
    });
    const { password, otp, otpExpiration, ...result } = JSON.parse(
      JSON.stringify(createdCustomer),
    );
    return result as CustomerEntity;
  }

  async confirmOtp(email: string, otp: string) {
    const customer = await this.customerRepository.findOne({ email }, {}, {});
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (!customer.otp || !customer.otpExpiration) {
      throw new BadRequestException('No OTP set for this account');
    }

    if (String(customer.otp) !== String(otp)) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > new Date(customer.otpExpiration)) {
      throw new BadRequestException('OTP expired');
    }

    await this.customerRepository.update(
      { _id: customer._id },
      { isVerified: true, otp: '', otpExpiration: new Date(0) },
      {},
    );

    const updated = {
      ...customer,
      isVerified: true,
      otp: '',
      otpExpiration: new Date(0),
    };
    const {
      password,
      otp: _otp,
      otpExpiration,
      ...result
    } = JSON.parse(JSON.stringify(updated));
    return result as CustomerEntity;
  }

  async login(loginDto: LoginDto) {
    const customer = await this.customerRepository.findOne(
      { email: loginDto.email },
      {},
      {},
    );

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      customer?.password || '',
    );
    if (!customer) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync(
      { _id: customer._id, email: customer.email, role: 'Customer' },
      { expiresIn: '7d', secret: this.configService.get<string>('JWT_SECRET') },
    );
    return token;
  }

  // Google login / register
  async googleLogin(idToken: string) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId)
      throw new BadRequestException('Google client id not configured');

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new BadRequestException('Invalid Google token payload');
    }

    const email = payload.email;
    const fullName =
      payload.name ||
      `${payload.given_name || ''} ${payload.family_name || ''}`.trim();
    const isVerified = Boolean(payload.email_verified);

    // <-- changed: make `user` an any to avoid strict mongoose/TS incompatibilities
    let user: any = await this.customerRepository.findOne({ email }, {}, {});
    if (!user) {
      user = await this.customerRepository.create({
        email,
        fullName,
        isVerified,
        userAgent: 'google',
      } as any); // keep as any to satisfy create() typing
    } else if (!user.isVerified && isVerified) {
      // mark verified if google says verified
      await this.customerRepository.update(
        { _id: user._id },
        { isVerified: true },
        {},
      );
      user.isVerified = true;
    }

    // <-- changed: normalize jwt options and cast expiresIn to any to satisfy overloads
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn =
      this.configService.get<string | number>('JWT_EXPIRES_IN') ?? '7d';

    const token = await this.jwtService.signAsync(
      { _id: user._id, email: user.email, role: 'Customer' },
      { expiresIn: expiresIn as any, secret },
    );

    const { password, otp, otpExpiration, ...safeUser } = JSON.parse(
      JSON.stringify(user),
    );
    return { user: safeUser as CustomerEntity, token };
  }
}
