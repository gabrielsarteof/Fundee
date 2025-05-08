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
