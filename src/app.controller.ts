import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req): string {
    this.logger.log(
      `Received request from user with email: ${req.user?.email}`,
    );
    return this.appService.getWelcome(req.user?.email);
  }
}
