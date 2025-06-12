"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import Image from 'next/image';

import { useRequestNonceMutation, useLoginMutation } from '@/hooks/useAuthMutations';
import { LoadingButton } from '@/components/LoadingButton';


declare global {
  interface Window {
    ethereum?: { request: (options: { method: string }) => Promise<any> };
  }
}

export default function LoginPage() {
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  // 1) Hooks de mutação: isPending em vez de isLoading
  const {
    mutate: requestNonceMutate,
    isPending: isRequesting,
  } = useRequestNonceMutation();
  const {
    mutate: loginMutate,
    isPending: isLoggingIn,
  } = useLoginMutation();

  // 2) Conectar MetaMask e obter nonce
  const handleRequestNonce = async () => {
    if (!window.ethereum) {
      alert('Instale o MetaMask');
      return;
    }
    try {
      const [acct]: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(acct);
      requestNonceMutate(acct, {
        onSuccess: (nonce) => setMessage(nonce),
        onError: () => alert('Erro ao solicitar nonce'),
      });
    } catch {
      alert('Erro ao conectar MetaMask');
    }
  };

  // 3) Assinar nonce e efetuar login
  const handleLogin = async () => {
    if (!window.ethereum) {
      alert('Instale o MetaMask');
      return;
    }
    if (!message) {
      alert('Nonce não recebido');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      loginMutate(
        { address, signature },
        {
          onSuccess: (data) => {
            if (data && data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken); // Armazenando o token
              localStorage.setItem('walletAddress', address);
              router.replace('/');  // Redireciona após o login
            } else {
              console.error("Token não encontrado na resposta:", data);
            }
          },
          onError: () => alert('Erro ao fazer login'),
        }
      );
    } catch {
      alert('Erro ao assinar mensagem');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-6 py-15 bg-white shadow rounded-lg">
          <div className="flex items-center justify-center mb-6">
            <Image className='mr-3' src="/logo.svg" alt="Galaxy Bay Logo" width={55} height={55} />
            <h1 className='font-poppins text-4xl text-indigo-900'>Galaxy Bay</h1>
          </div>

          <h1 className="text-center text-xl font-semibold mb-6">
            Entre ou cadastre-se
          </h1>

          <button
            onClick={handleRequestNonce}
            disabled={isRequesting || Boolean(address)}
            className="w-full flex items-center justify-center gap-2 py-2 mb-4 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            {isRequesting ? (
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <Image
                src="/MetaMask-icon-fox.svg"
                alt="MetaMask"
                width={22}
                height={22}
              />
            )}
            <span>
              {isRequesting
                ? 'Conectando...'
                : address
                  ? 'Conectado'
                  : 'Continuar com MetaMask'}
            </span>
          </button>

          {/* Enquanto não conectado ou conectando */}
          {(!address || isRequesting) && (
            <>
              <div className="flex items-center mb-4 py-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-gray-500">ou</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <p className="text-center text-sm text-gray-500 mb-4">
                Precisa de ajuda para entrar na sua conta?
              </p>
            </>
          )}

          {/* Mostrar apenas após conectado */}
          {address && !isRequesting && (
            <div className=' w-full mt-5'>
              <p className="mb-8 text-center text-sm text-gray-700">
                Conectado como <strong>{address.slice(0, 6)}…{address.slice(-4)}</strong>.
              </p>
              <LoadingButton
                onClick={handleLogin}
                loading={isLoggingIn}
                disabled={!message}
              >
                Assinar e entrar
              </LoadingButton>
            </div>
          )}
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
    </>

  );
}
