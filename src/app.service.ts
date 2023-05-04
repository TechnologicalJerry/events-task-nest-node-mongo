/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {

  constructor(private readonly eventEmitter: EventEmitter2) { }

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async creatUser(body: CreateUserRequest) {
    this.logger.log('Creating user...', body);
  }
}
