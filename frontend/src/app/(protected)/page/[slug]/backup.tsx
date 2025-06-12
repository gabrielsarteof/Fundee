// src/app/(protected)/page/[slug]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, Rocket } from 'lucide-react';
import randomColor from 'randomcolor';
import { usePageBySlug } from '@/hooks/usePageBySlug';
import { updatePage } from '@/services/page';
import { LinkIcon } from '@heroicons/react/24/solid';
import { FileMediaIcon } from '@primer/octicons-react'
import EditableField from '@/components/EditableField';
import type { components } from '@/types/api-schema';
import PageCheckList from '@/components/PageCheckList';
import CreatorPageSidebar from '@/components/CreatorPageSidebar';

type PageResponseDto = components['schemas']['PageResponseDto'];

function getColor(seed: string) {
  return randomColor({ seed, luminosity: 'light' });
}
function getAvatarUrl(seed: string) {
  const bg = getColor(seed).replace('#', '');
  const seedEnc = encodeURIComponent(seed);
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seedEnc}&backgroundColor=${bg}&size=128`;
}
function getBannerStyle(seed: string) {
  const c1 = getColor(seed),
    c2 = getColor(seed + '_alt');
  return { background: `linear-gradient(to right, ${c1}, ${c2})` as const };
}

export default function PageDashboard() {
  const { slug = '' } = useParams() as { slug?: string };
  const router = useRouter();

  const { data: page, isLoading, isError } = usePageBySlug(slug);
  const [localName, setLocalName] = useState('');
  const [localTagline, setLocalTagline] = useState('');
  const [localSlug, setLocalSlug] = useState('');
  const [dirty, setDirty] = useState(false);
  const [isBannerHover, setIsBannerHover] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);
  const [isAvatarHover, setIsAvatarHover] = useState(false);
  const [isAvatarIconHover, setIsAvatarIconHover] = useState(false);


  // Quando a página carrega ou recarrega, sincroniza os estados locais
  useEffect(() => {
    if (page) {
      setLocalName(page.name);
      setLocalTagline(page.tagline ?? '');
      setLocalSlug(page.slug);
      setDirty(false);
    }
  }, [page]);

  // Só permitimos edição se não estiver publicado
  const isEditing = page?.status !== 'published';

  // Detecta se houve alguma modificação local
  useEffect(() => {
    if (!page) return;
    const changed =
      localName !== page.name ||
      localTagline !== (page.tagline ?? '') ||
      localSlug !== page.slug;
    setDirty(changed);
  }, [localName, localTagline, localSlug, page]);

  // Função para salvar todas as alterações de uma vez
  const handleSave = async () => {
    if (!page) return;
    const payload: Partial<PageResponseDto> = {};
    if (localName !== page.name) payload.name = localName;
    if (localTagline !== (page.tagline ?? '')) payload.tagline = localTagline;
    if (localSlug !== page.slug) payload.slug = localSlug;

    try {
      await updatePage(page.id, payload);
      router.refresh();
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
    }
  };

  // Descartar = voltar ao estado original
  const handleDiscard = () => {
    router.refresh();
  };

  // Publicar (muda status para published)
  const handlePublish = async () => {
    if (!page) return;
    try {
      await updatePage(page.id, { status: 'published' });
      router.refresh();
    } catch (err) {
      console.error('Erro ao publicar página:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="ml-64 flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }
  if (isError || !page) {
    return (
      <div className="ml-64 p-6 text-red-500">
        Não foi possível carregar a página.
      </div>
    );
  }

  return (
    <div className="flex">
      <aside className="fixed inset-y-0 left-0 w-64">
        <CreatorPageSidebar />
      </aside>

      <main className="ml-64 flex-1 overflow-y-auto bg-gray-50 min-h-screen">
        <header className="sticky top-0 z-20 bg-gray-200 border-b flex flex-col gap-2">
          <div className="flex px-6 py-4 justify-between items-center">
            {page.status !== 'published' && (
              <span className="text-gray-600">
                Sua página ainda não foi publicada
              </span>
            )}
            <div className="flex space-x-4">
              <Link
                href={`/page/${page.slug}`}
                className="inline-flex items-center px-5 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar página
              </Link>
              {page.status !== 'published' && (
                <button
                  onClick={handlePublish}
                  className="inline-flex items-center px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Publicar página
                </button>
              )}
            </div>
          </div>

          {isEditing && dirty && (
            <div className="bg-white px-6 py-5 flex justify-between items-center border-t">
              <span className="text-blacj text-base">
                Você tem alterações não publicadas.
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handleDiscard}
                  className="px-5 py-2 border border-gray-300 rounded-lg bg-white text-sm font-semibold hover:bg-gray-50"
                >
                  Descartar
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </header>

        <div className="flex w-full bg-white justify-center">
          <div className="w-full">
            <div className="relative">
              <div
                className="w-full"
                onMouseEnter={() => isEditing && setIsBannerHover(true)}
                onMouseLeave={() => {
                  setIsBannerHover(false);
                  setIsBtnHover(false);
                }}
              >
                {/* banner existente */}
                {page.bannerUrl ? (
                  <img
                    src={page.bannerUrl}
                    alt={page.name}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-80"
                    style={getBannerStyle(page.name)}
                  />
                )}

                {/* botão “Enviar imagem de capa” */}
                {isEditing && isBannerHover && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="pointer-events-auto"
                      onMouseEnter={() => setIsBtnHover(true)}
                      onMouseLeave={() => setIsBtnHover(false)}
                    >
                      <button className="bg-black/50 text-white text-sm px-5 py-3 rounded-xl inline-flex items-center">
                        <FileMediaIcon className="mr-2" size={16} />
                        Enviar imagem de capa
                      </button>

                      {isBtnHover && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-max bg-black/50 text-white text-xs mt-2 px-3 py-2 rounded-lg">
                          Recomendamos que seu banner tenha 1200 × 400 pixels
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="relative w-32 h-32"
                  onMouseEnter={() => isEditing && setIsAvatarHover(true)}
                  onMouseLeave={() => {
                    setIsAvatarHover(false);
                    setIsAvatarIconHover(false);
                  }}
                >
                  {/* avatar */}
                  {page.avatarUrl ? (
                    <img
                      src={page.avatarUrl}
                      alt={page.name}
                      className="w-32 h-32 rounded-3xl border-4 border-white object-cover"
                    />
                  ) : (
                    <img
                      src={getAvatarUrl(page.name)}
                      alt={page.name}
                      className="w-32 h-32 rounded-3xl border-4 border-white object-cover"
                    />
                  )}

                  {/* ícone de trocar avatar */}
                  {isEditing && isAvatarHover && (
                    <div className="absolute bottom-0 right-0 pointer-events-none">
                      <div
                        className="pointer-events-auto bg-white rounded-full p-2 shadow-lg cursor-pointer"
                        onMouseEnter={() => setIsAvatarIconHover(true)}
                        onMouseLeave={() => setIsAvatarIconHover(false)}
                      >
                        <FileMediaIcon className="w-5 h-5 text-gray-700" />
                      </div>

                      {/* tooltip de recomendação */}
                      {isAvatarIconHover && (
                        <div className="absolute left-1/2 transform bottom-full mb-2 -translate-x-1/2 w-max bg-black/50 text-white text-xs px-3 py-2 rounded-lg">
                          Recomendamos que sua imagem tenha 1024 × 1024 pixels
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações editáveis */}
        <section className="mt-20 text-center">
          <h1 className="text-xl font-bold">
            <EditableField
              value={localName}
              isEditing={isEditing}
              onChange={setLocalName}
              onSave={() => Promise.resolve()}
              className="text-xl font-bold"
            />
          </h1>
          <div
          />
          <p className="text-sm text-gray-500 mt-4">
            <EditableField
              value={localTagline}
              isEditing={isEditing}
              onChange={setLocalTagline}
              onSave={() => Promise.resolve()}
              placeholder="Adicionar título"
              className="text-sm text-gray-500 mt-4"
            />
          </p>
          {page.slug && (
            <Link
              href={page.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-blue-600 mt-2"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {page.slug}
            </Link>
          )}
        </section>

        {/* Navegação secundária */}
        <nav className="mt-6 shadow">
          <div className="px-75">
            <ul className="flex justify-between px-6 py-3 text-gray-700 font-medium text-sm">
              <li className="pb-2 hover:border-b-2 hover:border-gray-300">Página Inicial</li>
              <li className="pb-2 hover:border-b-2 hover:border-gray-300">Coleções</li>
              <li className="pb-2 hover:border-b-2 hover:border-gray-300 flex items-center">
                Compras<EyeOff className="w-4 h-4 ml-1" />
              </li>
              <li className="pb-2 hover:border-b-2 hover:border-gray-300">Assinatura</li>
              <li className="pb-2 hover:border-b-2 hover:border-gray-300">Sobre</li>
              <li className="pb-2 hover:border-b-2 hover:border-gray-300">Recomendações</li>
            </ul>
          </div>
        </nav>

        <div className="flex pt-10 pb-30 justify-center">
          <PageCheckList />
        </div>
      </main>
    </div>
  );
}
