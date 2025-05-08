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
