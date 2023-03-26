import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default User;
