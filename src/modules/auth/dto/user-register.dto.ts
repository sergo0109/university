import { UserLoginDto } from './user-login.dto';
import { ApiProperty } from '@nestjs/swagger';
import {IsString} from "class-validator";

export class UserRegisterDto extends UserLoginDto {
    @ApiProperty()
    @IsString()
    fullName: string;
}
