export class UserCreateEvent {
    constructor(public readonly usireId: string, public readonly email: string) { }
}