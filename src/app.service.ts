/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './user.dto';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async creatUser(body: CreateUserRequest) {

  }
}
