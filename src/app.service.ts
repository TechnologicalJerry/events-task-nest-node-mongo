/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreateEvent } from './createUser.event';

@Injectable()
export class AppService {

  constructor(private readonly eventEmitter: EventEmitter2) { }

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async creatUser(body: CreateUserRequest) {
    this.logger.log('Creating user...', body);
    const userId = '123';
    this.eventEmitter.emit('user.create', new UserCreateEvent(userId, body.email))
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreateEvent) {
    this.logger.log('Welcome New User:::', payload.email);
  }
}
