import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  /**
   * Construct a new instance of the JWT strategy
   *
   * @param configService - The Nest configuration service
   *
   * The constructor initializes the JWT strategy with the
   * following configuration options:
   * - `jwtFromRequest`: The function to extract the JWT from the
   *   Authorization header.
   * - `ignoreExpiration`: Whether to ignore JWT expiration.
   * - `secretOrKey`: The secret key to validate the JWT.
   */
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validate the JWT payload
   *
   * @param payload - The payload from the JWT, containing the user ID and email
   * @returns The validated user object
   */
  async validate(payload: any) {
    this.logger.log(
      `JWT successfully validated for user with email: ${payload.email}`,
    );

    // Validate the JWT payload, in this case, the user ID and email
    return { id: payload.sub, email: payload.email };
  }
}
