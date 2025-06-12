// src/app/providers.tsx
'use client'

import React, { useMemo, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export function Providers({ children }: { children: ReactNode }) {
  // 1) QueryClient com gcTime/staleTime longos
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60 * 24, // 24h
          gcTime:    1000 * 60 * 60 * 24, // 24h
          refetchOnMount:       false,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    })
  }, [])

  // 2) Cria o persister só no client, não no topo do módulo
  const persister = useMemo(() => {
    if (typeof window === 'undefined') return null
    return createSyncStoragePersister({
      storage: window.localStorage,
    })
  }, [])

  // 3) Se estiver no SSR (sem persister), use o Provider padrão
  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }

  // 4) No client, use PersistQueryClientProvider para hidratar o cache
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, // ≤ gcTime
      }}
      onSuccess={() => {
        // reativa mutações pausadas, se usar offline
        queryClient.resumePausedMutations()
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
