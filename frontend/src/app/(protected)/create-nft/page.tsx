// src/app/(protected)/create-nft/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import NFTAbi from '@/abi/NFT.json';
import { generateMetadata, registerNft } from '@/services/api';

const schema = z.object({
  name: z.string().min(1, 'Digite o nome da NFT'),
  description: z.string().optional(),
  image: z.string().url('Digite uma URL válida para a imagem'),
  price: z.coerce.number().min(0, 'Preço deve ser ≥ 0'),
});
type FormData = z.infer<typeof schema>;

export default function CreateNftPage() {
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      price: 0,
    },
  });

  async function connectWallet() {
    // cast to any to avoid TS-global conflicts
    const { ethereum }: any = window;
    if (!ethereum) {
      alert('Instale o MetaMask para continuar');
      return;
    }
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      setOwnerAddress(accounts[0]);
      setWalletConnected(true);
    } catch (err: any) {
      console.error(err);
      alert('Falha ao conectar carteira: ' + err.message);
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!walletConnected) {
      await connectWallet();
      if (!walletConnected) return;
    }

    try {
      setIsMinting(true);

      // 1️⃣ Gera metadata no IPFS via backend
      const { metadataUrl } = await generateMetadata({
        name: data.name,
        description: data.description,
        image: data.image,
      });

      // 2️⃣ Instancia provider/signer via MetaMask (cast to any)
      const { ethereum }: any = window;
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // 3️⃣ Instancia o contrato
      const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
      const contract = new ethers.Contract(contractAddress, NFTAbi as any, signer);

      // 4️⃣ Chama mint → msg.sender será ownerAddress
      const tx = await contract.mint(metadataUrl);
      const receipt = await tx.wait();

      // 5️⃣ Extrai tokenId do evento Transfer
      const transferEvent = receipt.events?.find((e: any) => e.event === 'Transfer');
      const tokenId = transferEvent?.args?.tokenId.toString() ?? '';

      // 6️⃣ Registra no backend
      await registerNft({
        ownerAddress,
        metadataUrl,
        tokenId,
        transactionHash: receipt.transactionHash,
        blockHash: receipt.blockHash,
        price: data.price,
      });

      alert('NFT criada com sucesso!');
      router.push('/biblioteca');
    } catch (err: any) {
      console.error(err);
      alert('Erro ao criar NFT: ' + (err.message || err));
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 shadow rounded-lg space-y-6">
        <h1 className="text-center text-2xl font-semibold">Criar Nova NFT</h1>

        {!walletConnected && (
          <button
            onClick={connectWallet}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Conectar MetaMask
          </button>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome da NFT</label>
            <input
              type="text"
              {...register('name')}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem</label>
            <input
              type="url"
              {...register('image')}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preço (ETH)</label>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isMinting || !walletConnected}
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isMinting ? 'Mintando...' : 'Criar NFT'}
          </button>
        </form>
      </div>
    </div>
  );
}
