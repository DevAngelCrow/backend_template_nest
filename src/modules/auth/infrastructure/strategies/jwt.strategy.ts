import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../../identity-access-management/domain/repositories/user-repository';
import { UserId } from '../../../identity-access-management/domain/value-objects/user-value-object/user-id';
import { UnauthorizedException } from '@/shared/application/exceptions/unauthorized.exception';
import { Injectable } from '@nestjs/common';
interface JwtPayload {
  user_name: string;
  id: number;
  permissions: string[];
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.userRepository.getOneByIdForAuth(
      new UserId(payload.id),
    );
    if (!user) {
      throw new UnauthorizedException('Invalid token: user does not exist');
    }
    return {
      user_name: payload.user_name,
      id: payload.id,
      permissions: user.getPermissions(),
    };
  }
}
