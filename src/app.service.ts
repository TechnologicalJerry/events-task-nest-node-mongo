/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreateEvent } from './createUser.event';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private schedularRegistry: SchedulerRegistry
  ) { }

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async creatUser(body: CreateUserRequest) {
    this.logger.log('Creating user...', body);
    const userId = '123';
    this.eventEmitter.emit('user.create', new UserCreateEvent(userId, body.email))
    const establishWebSocketsTimeout = setTimeout(
      () => this.establishWebSocketsConnection(userId),
      5000,
    )
  }

  private establishWebSocketsConnection(userId: string) {
    this.logger.log('Establishing WS connection with user...', userId);
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreateEvent) {
    this.logger.log('Welcome New User:::', payload.email);
  }

  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreateEvent) {
    this.logger.log('Sending Welcome Gift:::', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Welcome Gift Sent:::', payload.email);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expire_user' })
  deleteExpireUser() {
    this.logger.log('Delete Expire User:::');
  }
}
