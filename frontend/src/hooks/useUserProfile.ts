'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { fetchUserProfile } from '@/services/user'
import { USER_PROFILE_KEY } from '@/constants/queryKeys'
import type { components } from '@/types/api-schema'

type ProfileResponseDto = components['schemas']['ProfileResponseDto']
type ProfileQueryKey = typeof USER_PROFILE_KEY

export function useUserProfile(
  options?: UseQueryOptions<
    ProfileResponseDto,    
    Error,                 
    ProfileResponseDto,    
    ProfileQueryKey        
  >
): UseQueryResult<ProfileResponseDto, Error> {
  return useQuery<
    ProfileResponseDto,
    Error,
    ProfileResponseDto,
    ProfileQueryKey
  >({
    queryKey: USER_PROFILE_KEY,
    queryFn: () => fetchUserProfile(),  
    staleTime: 1000 * 60 * 60 * 24,     
    gcTime: 1000 * 60 * 60 * 24,        
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  })
}
