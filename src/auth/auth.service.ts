import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * Creates a new user account with the given email, name and password.
   * Throws a ConflictException if the email already exists.
   * Returns the newly created user object, excluding the password.
   * @param email The email address of the user to create
   * @param name The name of the user to create
   * @param password The password of the user to create
   */
  async signup(email: string, name: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Signup failed: email already exists for ${email}`);

      throw new ConflictException('email already exists');
    }

    this.logger.log(`Hashing password for email: ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);

    this.logger.log(`Creating user for email: ${email}`);
    const newUser = await this.usersService.createUser(
      email,
      name,
      hashedPassword,
    );

    const { password: _, ...result } = newUser; // Exclude the password from the result

    this.logger.log(`Signup successful for email: ${email}`);
    return result;
  }

  /**
   * Logs in a user, given their validated user object, and returns an access token that can be used to authenticate
   * with the application.
   *
   * @param user The validated user object, containing the email and _id
   * @returns An object containing the access token
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    this.logger.log(
      `access token successfully generated for user with email: ${user.email}`,
    );
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT using payload
    };
  }

  /**
   * Validates a user by checking their email and password.
   *
   * @param email The email address of the user to validate
   * @param password The password of the user to validate
   *
   * @returns The validated user object if the credentials are valid, otherwise throws an UnauthorizedException.
   *
   * @throws UnauthorizedException if the email or password is invalid.
   */
  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);

    const user = await this.usersService.findByEmail(email);

    this.logger.debug(`User found for email: ${email}. Comparing passwords...`);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject(); // Exclude the password field

      this.logger.log(`User with email: ${email} authenticated successfully.`);
      return result;
    }

    this.logger.warn(`Incorrect password provided for email: ${email}`);
    throw new UnauthorizedException('Invalid credentials');
  }
}
