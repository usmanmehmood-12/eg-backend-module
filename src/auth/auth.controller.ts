import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  /**
   * Authenticates a user by checking their email and password.
   *
   * @param req The request object containing the user's credentials
   *
   * @returns The generated JWT token upon successful login
   */
  async login(@Request() req) {
    this.logger.log(`Login attempt for user with email: ${req.user?.email}`);

    return this.authService.login(req.user); // Generate JWT token upon successful login
  }

  @Post('signup')
  /**
   * Creates a new user account with the given email, name and password.
   *
   * @param body The request body containing the user's email, name and password
   *
   * @returns The newly created user object, excluding the password
   *
   * @throws ConflictException if the email already exists
   */
  async signup(
    @Body() body: { email: string; name: string; password: string },
  ) {
    this.logger.log('Signup request received');
    this.logger.debug(`Attempting to sign up user with email: ${body.email}`);
    return this.authService.signup(body.email, body.name, body.password);
  }
}
