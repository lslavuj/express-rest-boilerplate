import { Table } from 'typeorm';

import { LOGIN_SESSION_TABLE } from '../models/LoginSession';

import type { MigrationInterface, QueryRunner } from 'typeorm';

class CreateLoginSession1679845876253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: LOGIN_SESSION_TABLE,
        columns: [
          {
            name: 'tokenUuid',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userAgent',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'browser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'browserVersion',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'os',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'osVersion',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deviceType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deviceModel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ipAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'loggedInAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'loggedOutAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'tokenExpirationDate',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            name: 'fk_userId',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(LOGIN_SESSION_TABLE);
  }
}
export default CreateLoginSession1679845876253;
