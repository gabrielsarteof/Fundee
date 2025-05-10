// frontend/src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestNonce, login as loginApi } from '@/services/api';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 1) Extende a interface global para window.ethereum
declare global {
  interface Window {
    ethereum?: { request: (options: { method: string }) => Promise<any> };
  }
}

// 2) Tipos usados pelas mutações
type RequestNonceResponse = { nonce: string };
type LoginResponse       = { accessToken: string };
type LoginVariables      = { address: string; signature: string };

export default function LoginPage() {
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  // 3) Solicitar nonce para autenticação
  const { mutate: requestNonceMutate, isPending: isRequesting } =
    useMutation<RequestNonceResponse, Error, string>({
      mutationFn: (addr) => requestNonce(addr),
      onSuccess: (data) => setMessage(data.nonce),
      onError: () => alert('Erro ao solicitar nonce'),
    });

  // 4) Fazer login com assinatura e gerar JWT
  const { mutate: loginMutate, isPending: isLoggingIn } =
    useMutation<LoginResponse, Error, LoginVariables>({
      mutationFn: ({ address, signature }) => loginApi(address, signature),
      onSuccess: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        router.replace('/');
      },
      onError: () => alert('Erro ao fazer login'),
    });

  // 5) Handler para conectar MetaMask e obter nonce
  const handleRequestNonce = async () => {
    if (!window.ethereum) {
      alert('Instale o MetaMask');
      return;
    }
    setIsConnecting(true);
    try {
      const [acct]: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Conta usada:', acct);
      setAddress(acct);
      requestNonceMutate(acct);
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  // 6) Handler para assinar nonce e autenticar
  const handleLogin = async () => {
    if (!window.ethereum) {
      alert('Instale o MetaMask');
      return;
    }
    if (!message) {
      alert('Nonce não recebido');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log('String a ser assinada:', message);
    const signature = await signer.signMessage(message);
    loginMutate({ address, signature });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-15 bg-white shadow rounded-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Meta Canvas Logo" width={90} height={90} />
        </div>

        <h1 className="text-center text-2xl font-semibold mb-6">
          Entre ou cadastre-se
        </h1>

        <button
          onClick={handleRequestNonce}
          disabled={isConnecting || Boolean(address)}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
        >
          {isConnecting ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <Image
              src="/MetaMask-icon-fox.svg"
              alt="MetaMask"
              width={24}
              height={24}
            />
          )}
          <span>
            {isConnecting
              ? 'Conectando...'
              : address
              ? 'Conectado'
              : 'Continuar com MetaMask'}
          </span>
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-gray-500">ou</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {message && (
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full py-2 mb-4 bg-zinc-800 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoggingIn ? 'Fazendo login...' : 'Assinar e entrar'}
          </button>
        )}

        <p className="text-center text-sm text-gray-500">
          Precisa de ajuda para entrar na sua conta?
        </p>
      </div>

      <p className="fixed bottom-4 text-center text-xs text-gray-400">
        Ao continuar, você concorda com nossos{' '}
        <a href="/terms" className="underline hover:text-gray-600">
          Termos
        </a>{' '}
        e a{' '}
        <a href="/privacy" className="underline hover:text-gray-600">
          Política de Privacidade
        </a>.
      </p>
    </div>
  );
}
