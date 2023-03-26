import Environment from '../src/common/enums/Environment';

process.env.JWT_SECRET_KEY = 'thisIsATestSecretKey';
process.env.NODE_ENV = Environment.Test;
process.env.DATABASE_PORT = '3307';
process.env.TEST_DATABASE_PORT = '3307';
