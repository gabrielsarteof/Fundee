// frontend/src/app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl text-center">
        {/* Logo centralizado */}
        <Image
          src="/logo.svg"
          alt="Meta Canvas Logo"
          width={96}
          height={96}
          className="mx-auto mb-6"
        />

        {/* Título principal */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Fundee
        </h1>

        {/* Descrição breve */}
        <p className="text-gray-600 mb-8">
          Gerencie e registre suas NFTs com MetaMask e nossa API.
        </p>

        {/* Call-to-Action para login */}
        <Link
          href="/auth/login"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Começar agora
        </Link>
      </div>
    </main>
  );
}
