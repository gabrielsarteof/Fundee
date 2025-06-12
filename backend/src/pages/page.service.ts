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
