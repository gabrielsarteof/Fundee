import axios from 'axios';
import api from './api';
import type { components } from '@/types/api-schema';

type PageResponseDto = components['schemas']['PageResponseDto'];
type CreatePageDto = components['schemas']['CreatePageDto'];

export async function createPage(input: CreatePageDto): Promise<PageResponseDto> {
  const { data } = await api.post<PageResponseDto>('/page', input);
  return data;
}

export async function getMyPage(): Promise<PageResponseDto | null> {
  try {
    const { data } = await api.get<PageResponseDto>('/page');
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function updatePage(
  id: string,
  payload: Partial<components['schemas']['CreatePageDto']> | FormData
): Promise<PageResponseDto> {
  if (payload instanceof FormData) {
    const { data } = await api.put<PageResponseDto>(
      `/page/${id}`,
      payload
    );
    return data;
  }
  const { data } = await api.put<PageResponseDto>(
    `/page/${id}`,
    payload
  );
  return data;
}

// Novo método para buscar página pública via slug
export async function getPageBySlug(slug: string): Promise<PageResponseDto> {
  const { data } = await api.get<PageResponseDto>(`/page/by-slug/${slug}`);
  return data;
}
