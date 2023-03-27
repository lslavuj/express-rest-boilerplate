## Express REST Boilerplate

Boilerplate Project for building RESTful APIs using Node.js, Express, TypeORM and MySQL

## Features

- Service Oriented Architecture
- RESTful API
- [Express framework](https://expressjs.com/)
- [Nodemon](https://github.com/remy/nodemon) for running the project locally
- [Typescript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io/) and [MySQL](https://www.mysql.com/) database
- Script for automatic creation of local and test database in a Docker container, with migrations and seed run
- Linting with [ESLint](https://eslint.org/)
- Consistent coding styles with [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/)
- [Husky](https://typicode.github.io/husky/#/) pre commit hooks
- Following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) philosophy
- Unit tests with [Jest](https://jestjs.io/), starting a clean mysql test database as Docker container on each test run
- Request validation with [Yup](https://github.com/jquense/yup)
- [JSON Web Token](https://jwt.io/) Authentication
- Graceful Error handling and logging with [Winston](https://github.com/winstonjs/winston)
- Implemented business Logic:

  - Users CRUD
  - User Change Password
  - Login
  - User Login Session Logging
  - Logout (from one device and all using token "blacklisting")
  - Authentication middleware

## Requirements Check List

1. Ensure your editor can run EditorConfig. [Check the list of available plugins](https://editorconfig.org/#download).
2. Ensure your editor can run Eslint. Check the references for [WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html) and [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
3. Ensure your editor can run Prettier. Check the references for [WebStorm](https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_apply_code_style) and [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
4. Ensure you are running minimum 16.14.2 version of node.
5. Ensure you have a [Docker](https://www.docker.com/products/docker-desktop/) installed

## Getting Started

1. Install required dependencies:

```bash
npm i
```

2. Create a `.env` file in root of your project and set it up following the `.env.example` file. Take care that `DATABASE_HOST` environment variable should be your local IP address.

3. Ensure that Docker is running on your machine, than run script to setup local an test database with Docker:

```bash
npm run initDatabases
```

4. Run locally with:

```bash
npm run start:dev
```

4. Run tests with:

```bash
npm test
```

## Commits And Branching

- Please read the following as commit structure follows the [conventional commits](https://www.conventionalcommits.org/) philosophy.

- Keep your commits small and to the point.

## TO DO List

- Swagger
- Add unit test for all functions (currently just for User CRUD)
- Dockerize the whole app
- Add more strict ESLint rules
