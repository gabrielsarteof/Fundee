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
