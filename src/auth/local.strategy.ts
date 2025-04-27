import { Strategy } from 'passport-local';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  /**
   * Constructs a new instance of the LocalStrategy, which is a PassportStrategy.
   *
   * @param authService The AuthService instance to use for authentication.
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Validates the user's credentials using the provided email and password.
   *
   * @param email - The email address of the user attempting to authenticate
   * @param password - The password associated with the user's email
   * @returns A promise that resolves to the validated user object if credentials are valid,
   *          or throws an UnauthorizedException if they are not.
   */

  async validate(email: string, password: string): Promise<any> {
    this.logger.log(`Validating credentials for email: ${email}`);

    // Call the service method to validate the user
    const user = await this.authService.validateUser(email, password);

    return user; // Return the user object if credentials are valid
  }
}
