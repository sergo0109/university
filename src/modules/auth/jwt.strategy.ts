import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../user/user.service';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserUnauthorizedException } from './exception/user-unauthorized.exception';
import {AuthService} from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        public readonly configService: ApiConfigService,
        public readonly userService: UserService,
        public readonly auth: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.authConfig.jwtSecret,
        });
    }

    async validate({ iat, exp, id: userId }) {
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            const description = 'timeout'
            throw new UserUnauthorizedException(description);
        }

        try {
            return (await this.userService.getOne(userId));
        } catch (err) {
            throw new UserUnauthorizedException(err.description);
        }
    }
}
