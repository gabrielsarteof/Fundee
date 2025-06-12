import api from './api';
import type { components } from '@/types/api-schema';

type CreateMetadataDto = components['schemas']['CreateMetadataDto'];
type RegisterNftDto = components['schemas']['RegisterNftDto'];

export async function generateMetadata(
  dto: CreateMetadataDto
): Promise<{ metadataUrl: string }> {
  const { data } = await api.post<{ metadataUrl: string }>('/nfts/generate-metadata', dto);  // Endpoint correto
  return data;
}

export async function registerNft(
  dto: RegisterNftDto
): Promise<unknown> {
  const { data } = await api.post<unknown>('/nfts/register', dto);  // Endpoint correto
  return data;
}
