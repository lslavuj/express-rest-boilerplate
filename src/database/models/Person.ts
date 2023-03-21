import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const PERSON_TABLE = 'person' as const;

@Entity()
class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: Date;
}

export default Person;
