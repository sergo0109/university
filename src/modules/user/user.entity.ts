import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { UserDto } from './dto/user.dto';
import { RoleEnum } from '../../constants/role.enum';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto>{
    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type:'enum', enum: RoleEnum })
    role: RoleEnum;

    dtoClass = UserDto;
}
