import { AbstractDto } from '../../common/dtoes/abstract.dto';
import { UserEntity } from '../user.entity';
import { RoleEnum } from '../../../constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends AbstractDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    email: string;

    @ApiProperty({
        type: 'enum',
        enum: RoleEnum,
        enumName: 'RoleEnum',
    })
    role: RoleEnum;

    constructor(userEntity: UserEntity) {
        super(userEntity);

        this.fullName = userEntity.fullName;
        this.email = userEntity.email;
        this.role = userEntity.role;
    }
}
