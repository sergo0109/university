import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import type { AbstractDto } from '../dtoes/abstract.dto';
import { UtilsProvider } from '../../../providers/utils.provider';

type GetConstructorArgs<T> = T extends new (...args: infer U) => any
    ? U
    : never;


export abstract class AbstractEntity<DTO extends AbstractDto>
    implements AbstractEntity<DTO>
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    updatedAt: Date;

    abstract dtoClass /*: new (entity: AbstractEntity /!*<T>*!/, options?: any) => T*/;

    toDto(options?: any): DTO {
        return UtilsProvider.toDto(this.dtoClass, this, options);
    }
}
