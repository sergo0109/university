import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {LoginPayloadDto} from './dto/login-payload.dto';
import {UserLoginDto} from './dto/user-login.dto';
import {UserRegisterDto} from './dto/user-register.dto';
import {AuthGuard} from "../../guars/auth.guard";
import {AuthUserInterceptor} from "../../interceptors/auth-user.interceptor";
import {UserDto} from "../user/dto/user.dto";
import {AuthUser} from "../../decorators/auth-user.decorator";
import {UserEntity} from "../user/user.entity";


@Controller()
@ApiTags()
export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginPayloadDto, description: 'Successfully login' })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        return this.authService.userLogin(userLoginDto);
    }

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginPayloadDto, description: 'Successfully Registered and login' })
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<LoginPayloadDto> {
        return this.authService.userRegisterAndLogin(userRegisterDto);
    }

    @Get('/me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto, description: 'current user info' })
    getCurrentUser(@AuthUser() user: UserEntity): UserDto {
        return new UserDto(user);
    }
}
