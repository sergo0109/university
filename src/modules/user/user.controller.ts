import {Controller, Delete, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {UserService} from './user.service';
import {Auth, UUIDParam} from "../../decorators/http.decorators";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {RoleEnum} from "../../constants/role.enum";

@Controller('users')
@ApiTags('users')
export class UserController{
    constructor(public readonly userService: UserService) {}

    @Get('/:id')
    @Auth(RoleEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'get user',
    })
    async getStudent(@UUIDParam('id') userId: string): Promise<UserDto> {
        return  this.userService.getStudent(userId);
    }

    @Get()
    @Auth(RoleEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'get all students',
    })
    async getAllStudents(): Promise<UserDto[]> {
        return  this.userService.getAllStudents();
    }

    @Delete('/:id')
    @Auth(RoleEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'get user',
    })
    async remove(@UUIDParam('id') userId: string): Promise<void> {
        return  this.userService.remove(userId);
    }
}
