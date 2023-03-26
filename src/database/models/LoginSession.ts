import { BaseEntity, Column, Entity, Generated, ManyToOne } from 'typeorm';

import User from './User';

export const LOGIN_SESSION_TABLE = 'loginSession' as const;

@Entity('loginSession')
export class LoginSession extends BaseEntity {
  @Column({ primary: true })
  @Generated('uuid')
  tokenUuid: string;

  @ManyToOne(() => User)
  userId: number;

  @Column()
  userAgent: string;

  @Column({ nullable: true })
  browser?: string;

  @Column({ nullable: true })
  browserVersion?: string;

  @Column({ nullable: true })
  os?: string;

  @Column({ nullable: true })
  osVersion?: string;

  @Column({ nullable: true })
  deviceType?: string;

  @Column({ nullable: true })
  deviceModel?: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column()
  loggedInAt: Date;

  @Column({ nullable: true })
  loggedOutAt?: Date;

  @Column({ nullable: true })
  tokenExpirationDate?: Date;
}

export default LoginSession;
