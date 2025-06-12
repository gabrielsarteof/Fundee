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
