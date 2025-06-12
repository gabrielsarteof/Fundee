'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { data, isError, isLoading } = useUserProfile();

  // Checa se há token localmente
  useEffect(() => {
    if (!token) {
      router.replace('/auth/login');
    } else {
      setTokenChecked(true);
    }
  }, [token, router]);

  // Se o token existe, mas a requisição falhou, redireciona
  useEffect(() => {
    if (tokenChecked && isError) {
      router.replace('/auth/login');
    }
  }, [isError, tokenChecked, router]);

  // Espera verificar o token e carregar perfil
  if (!tokenChecked || isLoading || !data) {
    return <Loading />;
  }

  return <>{children}</>;
}