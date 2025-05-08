# .gitignore

```
# compiled output
/dist
/node_modules
/build

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
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/swagger": "^11.2.0",
    "@prisma/client": "^6.7.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "cors": "^2.8.5",
    "ethereumjs-util": "^7.1.5",
    "ethers": "^6.13.7",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.2",
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
    "@types/node": "^22.10.7",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^10.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^16.0.0",
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
  id        String   @id @default(uuid())
  address   String   @unique
  nonce     String
  createdAt DateTime @default(now())

  // NFTs que esse usuário possui
  nfts      Nft[]    @relation("UserNFTs")

  // Transações em que o usuário foi comprador
  transactions Transaction[] @relation("BuyerTransactions")
}

model Nft {
  id          String   @id @default(uuid())
  name        String
  description String?
  metadataUrl String
  price       Float
  ownerId     String
  owner       User     @relation("UserNFTs", fields: [ownerId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  isListed     Boolean @default(false)

  transactions Transaction[]
  blockchainData BlockchainData? // relação 1:1 (opcional)
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
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

# src\app.module.ts

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { NftModule } from './nft/nft.module';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, NftModule], 
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
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto); // Garante o registro do usuário
  }

  @Post('request-nonce')
  async getNonce(@Body() body: { address: string }) {
    return this.authService.requestNonce(body.address); // Gera nonce para o usuário
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.verifySignature(loginDto.address, loginDto.signature); // Verifica a assinatura e gera o JWT
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
  ) {}

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

    const expectedMessage = `Login with wallet: ${address}`;
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

    await this.prisma.user.update({
      where: { address },
      data: { nonce: '' },
    });

    const token = this.jwtService.sign({ sub: user.id, address: user.address });
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

# src\auth\dto\login.dto.ts

```ts
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  address: string;

  @IsString()
  signature: string;
}

```

# src\auth\dto\register.dto.ts

```ts
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
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
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, address: payload.address };
  }
}

```

# src\main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

# src\nft\dto\create-metadata.dto.ts

```ts
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Attribute {
  @IsString() trait_type: string;
  @IsString() value: string;
}

export class CreateMetadataDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsNotEmpty() image: string;
  @IsArray() @ValidateNested({ each: true }) @Type(() => Attribute)
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
import { NftService } from './nft.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMetadataDto } from './dto/create-metadata.dto';
import { RegisterNftDto } from './dto/register-nft.dto';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate-metadata')
  async generateMetadata(
    @Body() dto: CreateMetadataDto,
  ): Promise<{ metadataUrl: string }> {
    const metadataUrl = await this.nftService.generateMetadata(dto);
    return { metadataUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
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
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}

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
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Criação de um novo usuário
  async createUser(address: string) {
    const nonce = uuidv4(); // Gerar um nonce único para o usuário

    const user = await this.prisma.user.create({
      data: {
        address,
        nonce, // Adiciona o nonce ao usuário
      },
    });

    return user;
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

