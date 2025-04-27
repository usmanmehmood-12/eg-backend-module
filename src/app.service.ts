import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getWelcome(email: string): string {
    this.logger.log('Successfully processed Welcome to app request');
    return `Welcome to the application ${email} !`;
  }
}
