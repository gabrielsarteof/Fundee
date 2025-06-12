import api from '@/services/api';
import type { components } from '@/types/api-schema';

type ProfileResponseDto = components['schemas']['ProfileResponseDto'];

// src/services/user.ts
export async function fetchUserProfile(): Promise<ProfileResponseDto> {
  const { data } = await api.get<ProfileResponseDto>('/users/profile');
  return data;
}
