# .gitignore

```
# compiled output
/dist
/node_modules
/build
/uploads

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# temp directory
.temp
.tmp

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

node_modules
.env

# Hardhat files
/cache
/artifacts

# TypeChain files
/typechain
/typechain-types

# solidity-coverage files
/coverage
/coverage.json

# Hardhat Ignition default folder for deployments against a local node
ignition/deployments/chain-31337

```

# .prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

# eslint.config.mjs

```mjs
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
);
```

# nest-cli.json

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}

```

# package.json

```json
{
  "name": "nft-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.2",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.1.1",
    "@nestjs/serve-static": "^5.0.3",
    "@nestjs/swagger": "^11.2.0",
    "@prisma/client": "^6.7.0",
    "ai-digest": "^1.2.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "cors": "^2.8.5",
    "ethereumjs-util": "^7.1.5",
    "ethers": "^6.13.7",
    "helmet": "^8.1.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.2",
    "nft.storage": "^7.2.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "swagger-ui-express": "^5.0.1",
    "uuid": "^11.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@swc/cli": "^0.6.0",
    "@swc/core": "^1.10.7",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/multer": "^1.4.12",
    "@types/node": "^22.10.7",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^10.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^16.0.0",
    "hardhat": "^2.24.0",
    "jest": "^29.7.0",
    "prettier": "^3.4.2",
    "prisma": "^6.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.1.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  },
  "overrides": {
    "brace-expansion": "1.1.11"
  }
}

```

# prisma\migrations\20250506195200_init\migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nft" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metadataUrl" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockchainData" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockchainData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "BlockchainData_nftId_key" ON "BlockchainData"("nftId");

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockchainData" ADD CONSTRAINT "BlockchainData_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

# prisma\migrations\20250507005744_add_is_listed_field\migration.sql

```sql
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "isListed" BOOLEAN NOT NULL DEFAULT false;

```

# prisma\migrations\20250510213146_extend_profile_fields\migration.sql

```sql
/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "websiteUrl" TEXT,
ALTER COLUMN "nonce" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

```

# prisma\migrations\20250511132259_remove_website_url_and_add_page\migration.sql

```sql
/*
  Warnings:

  - You are about to drop the column `websiteUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "pageId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "websiteUrl";

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_name_key" ON "Page"("name");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# prisma\migrations\20250511133858_add_slug_to_page\migration.sql

```sql
/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

```

# prisma\migrations\20250512112716_remove_profile_fields_and_extend_page_fields\migration.sql

```sql
/*
  Warnings:

  - You are about to drop the column `bannerUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "subscriberCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannerUrl",
DROP COLUMN "bio",
DROP COLUMN "displayName",
DROP COLUMN "location";

```

# prisma\migrations\20250512120555_one_page_per_user\migration.sql

```sql
/*
  Warnings:

  - You are about to drop the column `subscriberCount` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "subscriberCount",
ADD COLUMN     "salesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Page_ownerId_key" ON "Page"("ownerId");

```

# prisma\migrations\migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

# prisma\prisma.module.ts

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() 
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

# prisma\prisma.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
```

# prisma\schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model User {
  id          String         @id @default(uuid())
  address     String         @unique
  nonce       String?        
  username    String?        @unique  
  avatarUrl   String?        
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  page        Page?          
  nfts        Nft[]          @relation("UserNFTs")
  transactions Transaction[]  @relation("BuyerTransactions")
}

model Page {
  id           String    @id @default(uuid())
  name         String    @unique
  slug         String   @unique
  ownerId      String    @unique
  owner        User      @relation(fields: [ownerId], references: [id])
  tagline      String?
  description  String?   @db.Text
  avatarUrl    String?
  bannerUrl    String?
  status       String    @default("draft")
  category     String?
  tags         String[]  
  viewCount    Int       @default(0)
  salesCount   Int       @default(0)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  nfts         Nft[]
}

model Nft {
  id          String   @id @default(uuid())
  name        String
  description String?
  metadataUrl String
  price       Float
  ownerId     String
  owner       User     @relation("UserNFTs", fields: [ownerId], references: [id])
  pageId      String?
  page        Page?          @relation(fields: [pageId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  isListed    Boolean @default(false)

  transactions Transaction[]
  blockchainData BlockchainData? 
}

model Transaction {
  id        String   @id @default(uuid())
  nftId     String
  nft       Nft      @relation(fields: [nftId], references: [id])
  buyerId   String
  buyer     User     @relation("BuyerTransactions", fields: [buyerId], references: [id])
  price     Float
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlockchainData {
  id               String   @id @default(uuid())
  nftId            String   @unique
  nft              Nft      @relation(fields: [nftId], references: [id])
  blockHash        String
  transactionHash  String
  createdAt        DateTime @default(now())
}

```

# README.md

```md
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

\`\`\`bash
$ npm install
\`\`\`

## Compile and run the project

\`\`\`bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
\`\`\`

## Run tests

\`\`\`bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
\`\`\`

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

\`\`\`bash
$ npm install -g @nestjs/mau
$ mau deploy
\`\`\`

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

```

# src\app.controller.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

```

# src\app.controller.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService }      from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')  
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna a mensagem de saudação padrão' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de saudação retornada com sucesso.',
    schema: { example: 'Hello World!' },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}

```

# src\app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';          
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { NftModule } from './nft/nft.module';
import { PrismaModule } from '../prisma/prisma.module';   
import { validationSchema } from './config/validation';
import { PageModule } from './pages/page.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: ['.env.development.local', '.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    NftModule,
    PageModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

# src\app.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

# src\auth\auth.controller.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

# src\auth\auth.controller.ts

```ts
// backend/src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService }            from './auth.service';
import { LoginDto }               from './dto/login.dto';
import { RegisterDto }            from './dto/register.dto';
import { RequestNonceResponseDto } from './dto/request-nonce-response.dto';
import { LoginResponseDto }        from './dto/login-response.dto';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('request-nonce')
  @ApiOperation({ summary: 'Solicitar nonce para autenticação' })
  @ApiBody({
    schema: { type: 'object', properties: { address: { type: 'string', example: '0x…' } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Nonce gerado com sucesso.',
    type: RequestNonceResponseDto,       // ← informa o tipo de resposta
  })
  async getNonce(@Body() body: { address: string }) {
    return this.authService.requestNonce(body.address);
  }

  @Post('login')
  @ApiOperation({ summary: 'Verificar assinatura e gerar JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'JWT gerado com sucesso.',
    type: LoginResponseDto,              // ← informa o tipo de resposta
  })
  @ApiResponse({ status: 401, description: 'Assinatura inválida.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.verifySignature(loginDto.address, loginDto.signature);
  }
}

```

# src\auth\auth.module.ts

```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } })],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy],
})
export class AuthModule {}

```

# src\auth\auth.service.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

# src\auth\auth.service.ts

```ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { verifyMessage } from 'ethers';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  // Método para registrar um novo usuário
  async register(registerDto: RegisterDto) {
    const { address } = registerDto;

    const userExists = await this.prisma.user.findUnique({ where: { address } });
    if (userExists) {
      throw new ConflictException('Usuário já existe');
    }

    const user = await this.userService.createUser(address);
    return { message: 'Usuário registrado com sucesso', user };
  }

  // Método para verificar a assinatura e gerar o token
  async verifySignature(address: string, signature: string) {
    const user = await this.prisma.user.findUnique({ where: { address } });
    if (!user || !user.nonce) {
      this.logger.warn(`Login falhou: usuário inexistente ou nonce ausente [address=${address}]`);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Usuário não encontrado ou nonce inválido.',
        error: 'Unauthorized',
      });
    }

    this.logger.log(`Esperando assinatura sobre ="${user.nonce}"`);

    const expectedMessage = user.nonce;
    let signer: string;

    try {
      signer = verifyMessage(expectedMessage, signature);
    } catch (err) {
      this.logger.warn(`Assinatura malformada recebida para ${address}`, err);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Assinatura inválida.',
        error: 'Unauthorized',
      });
    }

    if (signer.toLowerCase() !== address.toLowerCase()) {
      this.logger.warn(`Assinatura não corresponde ao endereço. [expected=${address}, received=${signer}]`);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Assinatura não corresponde ao endereço informado.',
        error: 'Unauthorized',
      });
    }

    const token = this.jwtService.sign({ sub: user.id, address: user.address });

    await this.prisma.user.update({
      where: { address },
      data: { nonce: '' },
    });

    return { access_token: token };
  }

  // Rota para pedir o nonce (usado na assinatura)
  async requestNonce(address: string) {
    const nonce = uuidv4();
    await this.prisma.user.upsert({
      where: { address },
      update: { nonce },
      create: { address, nonce },
    });
    return { nonce };
  }
}

```

# src\auth\dto\login-response.dto.ts

```ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'ey…jwt-token…abc', description: 'Token de acesso JWT' })
  accessToken: string;
}

```

# src\auth\dto\login.dto.ts

```ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty }          from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Endereço Ethereum do usuário',
    example: '0x1234abcd5678efgh9012ijklmnopqrstuvwx',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Assinatura gerada pelo usuário para provar propriedade do address',
    example: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef1',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;
}

```

# src\auth\dto\register.dto.ts

```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Endereço Ethereum do usuário',
    example: '0x1234abcd5678efgh9012ijklmnopqrstuvwx',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}

```

# src\auth\dto\request-nonce-response.dto.ts

```ts
import { ApiProperty } from '@nestjs/swagger';

export class RequestNonceResponseDto {
  @ApiProperty({ example: 'random-string-nonce', description: 'Nonce gerado para assinar' })
  nonce: string;
}
```

# src\auth\jwt-auth.guard.ts

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

```

# src\auth\jwt.strategy.ts

```ts
// backend/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      address: payload.address,
    };
  }
}

```

# src\config\validation.ts

```ts
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  DATABASE_URL: Joi.string().uri().required(),
  NFT_STORAGE_KEY: Joi.string().required(),
});

```

# src\main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Galaxy Bay API')
    .setDescription('API para Auth, Users e NFTs')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

main();

```

# src\nft\dto\create-metadata.dto.ts

```ts
// backend/src/nft/dto/create-metadata.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Attribute {
  @ApiProperty({ description: 'Tipo de trait do atributo', example: 'Background' })
  @IsString()
  @IsNotEmpty()
  trait_type: string;

  @ApiProperty({ description: 'Valor do atributo', example: 'Blue' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateMetadataDto {
  @ApiProperty({ description: 'Nome da NFT', example: 'Minha NFT' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Descrição da NFT', example: 'Descrição detalhada da minha NFT' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'URL da imagem da NFT', example: 'https://ipfs.io/ipfs/abcdef123456/image.png' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiPropertyOptional({
    description: 'Lista de atributos adicionais da NFT',
    type: [Attribute],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attribute)
  @IsOptional()
  attributes?: Attribute[];
}

```

# src\nft\dto\register-nft.dto.ts

```ts
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class RegisterNftDto {
  @IsString() @IsOptional()
  name?: string;

  @IsString() @IsOptional()
  description?: string;

  @IsUrl()
  metadataUrl: string;

  @IsNumber()
  price: number;

  @IsString()
  tokenId: string;

  @IsString()
  transactionHash: string;

  @IsString()
  blockHash: string;
}

```

# src\nft\nft.controller.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from './nft.controller';

describe('NftController', () => {
  let controller: NftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftController],
    }).compile();

    controller = module.get<NftController>(NftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

# src\nft\nft.controller.ts

```ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { NftService }                                from './nft.service';
import { JwtAuthGuard }                              from '../auth/jwt-auth.guard';
import { CreateMetadataDto }                         from './dto/create-metadata.dto';
import { RegisterNftDto }                            from './dto/register-nft.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('nfts')                          
@ApiBearerAuth('access-token')            
@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate-metadata')
  @ApiOperation({ summary: 'Gerar metadata e armazenar no IPFS' })
  @ApiBody({ type: CreateMetadataDto })
  @ApiResponse({
    status: 201,
    description: 'Metadata gerado com sucesso.',
    schema: {
      example: { metadataUrl: 'https://ipfs.io/ipfs/abc123def456/metadata.json' },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async generateMetadata(
    @Body() dto: CreateMetadataDto,
  ): Promise<{ metadataUrl: string }> {
    const metadataUrl = await this.nftService.generateMetadata(dto);
    return { metadataUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiOperation({ summary: 'Registrar NFT na blockchain' })
  @ApiBody({ type: RegisterNftDto })
  @ApiResponse({ status: 201, description: 'NFT registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async registerNft(
    @Body() dto: RegisterNftDto,
    @Request() req: any,
  ) {
    const ownerId = req.user.userId;
    return this.nftService.register(dto, ownerId);
  }
}

```

# src\nft\nft.module.ts

```ts
import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { IpfsModule } from '../utils/ipfs.module';

@Module({
  imports: [IpfsModule],
  controllers: [NftController],
  providers: [NftService]
})
export class NftModule {}

```

# src\nft\nft.service.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from './nft.service';

describe('NftService', () => {
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService],
    }).compile();

    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

# src\nft\nft.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMetadataDto } from './dto/create-metadata.dto';
import { IpfsService } from 'src/utils/ipfs.service';
import { RegisterNftDto } from './dto/register-nft.dto';

@Injectable()
export class NftService {
  constructor(
    private prisma: PrismaService, 
    private ipfs: IpfsService,
  ) {}

  async generateMetadata(dto: CreateMetadataDto): Promise<string> {
    // Monta o objeto JSON de metadata
    const metadata = {
      name: dto.name,
      description: dto.description,
      image: dto.image,
      attributes: dto.attributes,
    };
    // Envia para IPFS e obtém a URL
    const metadataUrl = await this.ipfs.uploadMetadata(metadata);
    return metadataUrl;
  }

  async register(dto: RegisterNftDto, ownerId: string) {
    // 1) Cria o registro off-chain
    const nft = await this.prisma.nft.create({
      data: {
        name: dto.name ?? '',
        description: dto.description,
        metadataUrl: dto.metadataUrl,
        price: dto.price,
        ownerId,
        isListed: true,
      },
    });

    // 2) Registra os dados on-chain
    await this.prisma.blockchainData.create({
      data: {
        nftId: nft.id,
        transactionHash: dto.transactionHash,
        blockHash: dto.blockHash,
      },
    });

    return nft;
  }

  async findAllPublic() {
    return this.prisma.nft.findMany({
      where: { isListed: true },
    });
  }
}

```

# src\pages\dto\create-page.dto.ts

```ts
import { 
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsUrl,
  IsArray,
  ArrayUnique
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ example: 'Galaxy Bay Official', description: 'Nome para exibição da página' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'galaxy-bay-official', description: 'Slug único para URL (apenas minúsculas, números e hífens)' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug só pode ter letras minúsculas, números e hífens',
  })
  slug: string;

  @ApiPropertyOptional({ example: 'O melhor lugar para explorar o universo NFT.', description: 'Tagline curta da página' })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ example: 'Aqui você encontra …', description: 'Descrição completa em texto ricco' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/avatar.png', description: 'URL do avatar da página' })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.exemplo.com/banner.jpg', description: 'URL do banner da página' })
  @IsOptional()
  @IsUrl()
  bannerUrl?: string;

  @ApiPropertyOptional({ example: 'draft', description: "Status da página (p.ex.: 'draft', 'published')" })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'arte digital', description: 'Categoria da página' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: ['nft', 'arte', 'galáxia'], description: 'Tags associadas à página' })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tags?: string[];
}

```

# src\pages\dto\page-response.dto.ts

```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único da página',
  })
  id: string;

  @ApiProperty({
    example: 'Galaxy Bay Official',
    description: 'Nome para exibição da página',
  })
  name: string;

  @ApiProperty({
    example: 'galaxy-bay-official',
    description: 'Slug único para URL',
  })
  slug: string;

  @ApiPropertyOptional({
    example: 'O melhor lugar para explorar o universo NFT.',
    description: 'Tagline curta da página',
  })
  tagline?: string;

  @ApiPropertyOptional({
    example: 'Aqui você encontra …',
    description: 'Descrição completa em texto rico',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.exemplo.com/avatar.png',
    description: 'URL do avatar da página',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.exemplo.com/banner.jpg',
    description: 'URL do banner da página',
  })
  bannerUrl?: string;

  @ApiPropertyOptional({
    example: 'draft',
    description: "Status da página (por exemplo: 'draft', 'published')",
  })
  status?: string;

  @ApiPropertyOptional({
    example: 'arte digital',
    description: 'Categoria da página',
  })
  category?: string;

  @ApiPropertyOptional({
    example: ['nft', 'arte', 'galáxia'],
    description: 'Tags associadas à página',
    type: [String],
  })
  tags?: string[];

  @ApiProperty({
    example: 123,
    description: 'Total de visualizações da página',
  })
  viewCount: number;

  @ApiProperty({
    example: 45,
    description: 'Total de inscritos na página',
  })
  salesCount: number;

  @ApiProperty({
    example: '2025-05-11T14:23:00.000Z',
    description: 'Data de criação da página',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-12T08:30:00.000Z',
    description: 'Data da última atualização da página',
    format: 'date-time',
  })
  updatedAt: Date;
}

```

# src\pages\dto\update-page.dto.ts

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {}
```

# src\pages\page.controller.ts

```ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Put,
  UploadedFiles,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { PageResponseDto } from './dto/page-response.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { Page as PageModel } from '@prisma/client';
import { UpdatePageDto } from './dto/update-page.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  private toDto(page: PageModel): PageResponseDto {
    // Retiramos ownerId e mantemos apenas campos do DTO
    const {
      ownerId,
      tagline,
      description,
      avatarUrl,
      bannerUrl,
      category,
      ...rest
    } = page;

    return {
      ...rest,
      tagline: tagline ?? undefined,
      description: description ?? undefined,
      avatarUrl: avatarUrl ?? undefined,
      bannerUrl: bannerUrl ?? undefined,
      category: category ?? undefined,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova página de criador' })
  @ApiResponse({
    status: 201,
    description: 'Página criada com sucesso.',
    type: PageResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito: name ou slug já existe.',
  })
  async createPage(
    @Req() req: ExpressRequest & { user: { userId: string } },
    @Body() dto: CreatePageDto,
  ): Promise<PageResponseDto> {
    const page = await this.pageService.create(req.user.userId, dto);
    return this.toDto(page);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter a única página do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Página retornada com sucesso.',
    type: PageResponseDto,
  })
  async getMyPage(
    @Req() req: ExpressRequest & { user: { userId: string } },
  ): Promise<PageResponseDto> {
    const page = await this.pageService.findOneByOwner(req.user.userId);
    return this.toDto(page);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter detalhes de uma página por ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da página.',
    type: PageResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Página não encontrada.',
  })

  async findOneById(
    @Req() req: ExpressRequest & { user: { userId: string } },
    @Param('id') id: string,
  ): Promise<PageResponseDto> {
    const page = await this.pageService.findOneById(req.user.userId, id);
    return this.toDto(page);
  }

  @Get('by-slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter detalhes públicos de uma página por slug' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da página.',
    type: PageResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Página não encontrada.',
  })
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<PageResponseDto> {
    const page = await this.pageService.findOneBySlug(slug);
    return this.toDto(page);
  }
}

```

# src\pages\page.module.ts

```ts
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService }    from './page.service';
import { PrismaService }  from '@/../prisma/prisma.service';

@Module({
  controllers: [PageController],
  providers:   [PageService, PrismaService],
})
export class PageModule {}

```

# src\pages\page.service.ts

```ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from '@prisma/client';

@Injectable()
export class PageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreatePageDto) {
    // 1) Verifica se já existe página para este usuário
    const existing = await this.prisma.page.findUnique({
      where: { ownerId },
    });
    if (existing) {
      throw new ConflictException(
        'Você já possui uma página cadastrada'
      );
    }

    // 2) Verifica slug global (mantém essa restrição)
    const slugExists = await this.prisma.page.findUnique({
      where: { slug: dto.slug },
    });
    if (slugExists) {
      throw new ConflictException('O slug informado já está em uso');
    }

    return this.prisma.page.create({
      data: {
        ownerId,
        name: dto.name,
        slug: dto.slug,
        tagline: dto.tagline,
        description: dto.description,
        avatarUrl: dto.avatarUrl,
        bannerUrl: dto.bannerUrl,
        status: dto.status,
        category: dto.category,
        tags: dto.tags,
      },
    });
  }

  async findOneByOwner(ownerId: string) {
    const page = await this.prisma.page.findUnique({
      where: { ownerId },
    });
    if (!page) {
      throw new NotFoundException('Página não encontrada');
    }
    return page;
  }

  async findOneById(ownerId: string, id: string) {
    const page = await this.prisma.page.findFirst({
      where: { ownerId, id },
    });
    if (!page) {
      throw new NotFoundException('Página não encontrada');
    }
    return page;
  }

  async findOneBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
    });
    if (!page) {
      throw new NotFoundException('Página não encontrada');
    }
    return page;
  }
}

```

# src\user\dto\profile-response.dto.ts

```ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiPropertyOptional({
    description: 'Nome de exibição do usuário',
    example: 'Alice',
  })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Handle público (username) do usuário',
    example: 'alice123',
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'Biografia curta do usuário',
    example: 'Desenvolvedora de dApps apaixonada por NFTs.',
  })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Localização geográfica do usuário',
    example: 'São Paulo, Brasil',
  })
  location?: string;

  @ApiPropertyOptional({
    description: 'URL da imagem de avatar do usuário',
    example: 'https://meusite.com/avatar.png',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'URL da imagem de banner do perfil',
    example: 'https://meusite.com/banner.png',
  })
  bannerUrl?: string;
}

```

# src\user\dto\update-profile.dto.ts

```ts
import { IsOptional, IsString, MaxLength, IsUrl, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Alice' })
  @IsString() @IsOptional() @MaxLength(30)
  displayName?: string;

  @ApiPropertyOptional({ example: 'alice123' })
  @IsString() @IsOptional() @MaxLength(30)
  username?: string;

  @ApiPropertyOptional({ example: 'Desenvolvedora e colecionadora de NFTs.' })
  @IsString() @IsOptional() @MaxLength(280)
  bio?: string;

  @ApiPropertyOptional({ example: 'São Paulo, Brasil' })
  @IsString() @IsOptional() @MaxLength(50)
  location?: string;

  @ApiPropertyOptional({ example: 'https://.../avatar.png' })
  @IsUrl() @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://.../banner.png' })
  @IsUrl() @IsOptional()
  bannerUrl?: string;
}
```

# src\user\user.controller.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

# src\user\user.controller.ts

```ts
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Perfil do usuário retornado com sucesso.' })
    async getProfile(@Req() req) {
        return this.userService.getProfile(req.user.address);
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    @ApiOperation({ summary: 'Atualizar perfil do usuário' })
    @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso.' })
    async updateProfile(
        @Body() dto: UpdateProfileDto,
        @Req() req: any,
    ) {
        const address: string = req.user.address;
        return this.userService.updateProfile(address, dto);
    }
}

```

# src\user\user.module.ts

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule {}

```

# src\user\user.service.spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

# src\user\user.service.ts

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(address: string) {
    const nonce = uuidv4();

    const user = await this.prisma.user.create({
      data: {
        address,
        nonce,
      },
    });

    return user;
  }

  async getProfile(address: string) {
    const user = await this.prisma.user.findUnique({
      where: { address },
      include: {
        page: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      username: user.username,
      avatarUrl: user.avatarUrl,
      page: user.page
        ? {
          id: user.page.id,
          name: user.page.name,
          slug: user.page.slug,
        }
        : null,
    };
  }

  async updateProfile(address: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { address } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.prisma.user.update({
      where: { address },
      data: {
        username: dto.username,
        avatarUrl: dto.avatarUrl,
      },
    });
  }
}

```

# src\utils\ipfs.module.ts

```ts
import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Module({
  providers: [IpfsService],
  exports: [IpfsService],
})
export class IpfsModule {}

```

# src\utils\ipfs.service.ts

```ts
import { Injectable, Logger } from '@nestjs/common';
import { NFTStorage, File } from 'nft.storage';

@Injectable()
export class IpfsService {
  private readonly logger = new Logger(IpfsService.name);
  private readonly client: NFTStorage;

  constructor() {
    const token = process.env.NFT_STORAGE_KEY;
    if (!token) {
      throw new Error('Missing NFT_STORAGE_KEY in .env');
    }
    this.client = new NFTStorage({ token });
  }

  /**
   * Recebe um objeto JS e envia como metadata.json para o IPFS.
   * Retorna a URL pública do IPFS.
   */
  async uploadMetadata(metadata: Record<string, any>): Promise<string> {
    // Converte o objeto em Blob e em File (browser API)
    const blob = new Blob([JSON.stringify(metadata)], {
      type: 'application/json',
    });
    const file = new File([blob], 'metadata.json');
    // Armazena e obtém o CID
    const cid = await this.client.storeBlob(file);
    const url = `https://ipfs.io/ipfs/${cid}`;
    this.logger.log(`Metadata uploaded: ${url}`);
    return url;
  }
}

```

# tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]            
    },
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}

```

