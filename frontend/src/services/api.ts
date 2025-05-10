// frontend/src/services/api.ts
import axios from 'axios';
import type { paths } from '@/types/api-schema';

// ─── Definições de tipos extraídos da spec ────────────────────────────────────

// Payloads de request
type CreateMetadataDto =
  paths['/nfts/generate-metadata']['post']['requestBody']['content']['application/json'];
type RegisterNftDto =
  paths['/nfts/register']['post']['requestBody']['content']['application/json'];
type RegisterUserDto =
  paths['/auth/register']['post']['requestBody']['content']['application/json'];

// Responses
type RequestNonceResponse =
  paths['/auth/request-nonce']['post']['responses']['200']['content']['application/json'];
type LoginResponse =
  paths['/auth/login']['post']['responses']['200']['content']['application/json'];

// ─── Instância Axios ─────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use(config => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('accessToken')
    : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Funções de API ────────────────────────────────────────────────────────────

export async function requestNonce(
  address: string
): Promise<RequestNonceResponse> {
  const res = await api.post<RequestNonceResponse>(
    '/auth/request-nonce',
    { address }
  );
  return res.data;
}

export async function login(
  address: string,
  signature: string
): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>(
    '/auth/login',
    { address, signature }
  );
  return res.data;
}

export async function registerUser(
  payload: RegisterUserDto
): Promise<unknown> {
  const res = await api.post<unknown>(
    '/auth/register',
    payload
  );
  return res.data;
}

export async function generateMetadata(
  dto: CreateMetadataDto
): Promise<{ metadataUrl: string }> {
  const res = await api.post<{ metadataUrl: string }>(
    '/nfts/generate-metadata',
    dto
  );
  return res.data;
}

export async function registerNft(
  dto: RegisterNftDto
): Promise<unknown> {
  const res = await api.post<unknown>(
    '/nfts/register',
    dto
  );
  return res.data;
}

export default api;
