import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import PasswordHashTransformer from '../valueTransformers/passwordHashTransformer';

import type TypeOrmMeta from '../../common/types/TypeOrmMeta';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 64,
    select: false,
    transformer: new PasswordHashTransformer(),
  })
  password: string;
}

export const USER_TABLE = 'user' as const;

export type UserType = Omit<User, TypeOrmMeta>;

export default User;
