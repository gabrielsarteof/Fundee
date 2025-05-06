import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { verifyMessage } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async requestNonce(address: string) {
    const nonce = uuidv4(); // pode usar outro gerador se quiser
    await this.prisma.user.upsert({
      where: { address },
      update: { nonce },
      create: { address, nonce },
    });
    return { nonce };
  }

  async verifySignature(address: string, signature: string) {
    const user = await this.prisma.user.findUnique({ where: { address } });

    if (!user || !user.nonce) {
      throw new UnauthorizedException('Usuário não encontrado ou nonce ausente');
    }

    const signer = verifyMessage(user.nonce, signature);

    if (signer.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Assinatura inválida');
    }

    // limpa o nonce usado (opcional, por segurança)
    await this.prisma.user.update({
      where: { address },
      data: { nonce: null },
    });

    const token = this.jwtService.sign({ address });
    return { access_token: token };
  }
}
