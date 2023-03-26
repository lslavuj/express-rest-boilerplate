import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import toBcryptHash from '../../common/utils/toBcryptHash';

// import type { ValueTransformer } from 'typeorm';

// const hash: ValueTransformer = {
//   from: (value: string) => value,
//   to: (value: string) => toBcryptHash(value),
// };

export const USER_TABLE = 'user' as const;

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

  @Column({ type: 'varchar', length: 64, select: false })
  password: string;
}

export default User;
