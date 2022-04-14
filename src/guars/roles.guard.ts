import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        let canActivate = !roles.length;

        if (!canActivate) {
            const request = context.switchToHttp().getRequest();
            const user = <UserEntity>request.user;
            canActivate = roles.includes(user.role);
        }

        return canActivate;
    }
}
