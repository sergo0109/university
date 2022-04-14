import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor() {
        super('error', 'can not found user');
    }
}