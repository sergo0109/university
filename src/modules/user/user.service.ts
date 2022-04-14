import {Injectable} from '@nestjs/common';
import {CreateDto} from './dto/create.dto';
import {UserRepository} from './user.repository';
import {UserEntity} from './user.entity';
import {UserNotFoundException} from './exception/user-not-found.exception';
import {Transactional} from 'typeorm-transactional-cls-hooked';
import {UserCreationException} from './exception/user-creation.exception';
import {UtilsProvider} from '../../providers/utils.provider';
import {UserDto} from "./dto/user.dto";
import {RoleEnum} from "../../constants/role.enum";


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    @Transactional()
    async create(createDto: CreateDto): Promise<UserEntity> {
        createDto.password = UtilsProvider.generateHash(createDto.password);
        const userEntity = await this.userRepository.create(createDto);
        try {
            await this.userRepository.save(userEntity);
            return userEntity;
        } catch (err) {
            throw new UserCreationException(err);
        }
    }

    async getOne(userId: string): Promise<UserDto> {
        const userEntity = await this.userRepository.findOne({ id: userId });
        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return new UserDto(userEntity);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOne({ email });
        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return userEntity;
    }

    async getStudent(studentId): Promise<UserDto> {
        const userEntity = await this.userRepository.findOne({ id: studentId, role: RoleEnum.STUDENT });
        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return new UserDto(userEntity);
    }

    async getAllStudents(): Promise<UserDto[]> {
        const users = await this.userRepository.find({where: {
            role: RoleEnum.STUDENT
            }});

        return users.map((user) => new UserDto(user));
    }

    async remove(userId): Promise<void> {
        await this.userRepository.delete(userId);
    }
}
