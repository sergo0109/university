import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsProvider } from '../../providers/utils.provider';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUnauthenticatedException } from './exception/user-unauthenticated.exception';
import { RoleEnum } from '../../constants/role.enum';

@Injectable()
export class AuthService {
    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ApiConfigService,
        public readonly userService: UserService,
    ) {}

    async createToken(userId: string): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.authConfig.jwtExpirationTime,
            accessToken: await this.jwtService.signAsync({ id: userId }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const userEntity = await this.userService.findByEmail(userLoginDto.email);
        const isPasswordValid = await UtilsProvider.validateHash(
            userLoginDto.password,
            userEntity.password,
        );

        if (!isPasswordValid) {
            const description = 'password is an invalid'
            throw new UserUnauthenticatedException(description);
        }

        return userEntity;
    }

    async userLogin(userInfo: UserLoginDto | UserEntity): Promise<LoginPayloadDto> {
        let userEntity: UserEntity;
        if(userInfo instanceof UserEntity) {
            userEntity = userInfo;
        } else {
            userEntity = await this.validateUser(userInfo);
        }
        const token = await this.createToken(userEntity.id);
        const user = userEntity.toDto();
        return { user, token };
    }

    async userRegisterAndLogin(userRegisterDto: UserRegisterDto): Promise<LoginPayloadDto> {
        const userEntity = await this.userService.create({ ...userRegisterDto, role: RoleEnum.STUDENT });
        return this.userLogin(userEntity);
    }
}
