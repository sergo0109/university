import {Controller, Delete, Get, HttpCode, HttpStatus, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {Auth} from "../../decorators/http.decorators";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {RoleEnum} from "../../constants/role.enum";

@Controller('students')
@ApiTags('students')
export class UserController{
    constructor(public readonly userService: UserService) {}

    @Get('/:id')
    @Auth(RoleEnum.ADMIN, RoleEnum.STUDENT)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'get user',
    })
    async getStudent(@Param('id') userId: string): Promise<UserDto> {
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
    async remove(@Param('id') userId: string): Promise<void> {
        return  this.userService.remove(userId);
    }
}
