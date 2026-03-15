import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.usersService.create(registerDto);
    const token = this.generateToken(user);
    const { password, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const token = this.generateToken(user);
    const { password, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async getProfile(userId: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(userId);
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
