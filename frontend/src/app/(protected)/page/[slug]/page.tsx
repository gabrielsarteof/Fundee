'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePageBySlug } from '@/hooks/usePageBySlug';
import { updatePage } from '@/services/page';
import CreatorPageSidebar from '@/components/CreatorPageSidebar';
import { PageHeader, HeroSection, PageMetaSection, SecondaryNav } from '@/components/PageDashboard';
import PageCheckList from '@/components/PageCheckList';
import type { components } from '@/types/api-schema';

type PageResponseDto = components['schemas']['PageResponseDto'];

export default function PageDashboard() {
  const { slug = '' } = useParams() as { slug?: string };
  const router = useRouter();
  const { data: page, isLoading, isError } = usePageBySlug(slug);

  const [localName, setLocalName] = useState('');
  const [localTagline, setLocalTagline] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (page) {
      setLocalName(page.name);
      setLocalTagline(page.tagline ?? '');
      setDirty(false);
    }
  }, [page]);

  const isEditing = page?.status !== 'published';

  useEffect(() => {
    if (!page) return;
    setDirty(
      localName !== page.name ||
      localTagline !== (page.tagline ?? '')
    );
  }, [localName, localTagline, page]);

  const handleSave = async () => {
    if (!page) return;
    const payload: Partial<PageResponseDto> = {};
    if (localName !== page.name) payload.name = localName;
    if (localTagline !== (page.tagline ?? '')) payload.tagline = localTagline;
    try {
      await updatePage(page.id, payload);
      router.refresh();
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const handleDiscard = () => router.refresh();
  const handlePublish = async () => {
    if (!page) return;
    try {
      await updatePage(page.id, { status: 'published' });
      router.refresh();
    } catch (err) {
      console.error('Erro ao publicar:', err);
    }
  };

  if (isLoading) return <div className="ml-64 flex items-center justify-center h-screen"><p>Carregando...</p></div>;
  if (isError || !page) return <div className="ml-64 p-6 text-red-500">Não foi possível carregar a página.</div>;

  return (
    <div className="flex">
      <aside className="fixed inset-y-0 left-0 w-64">
        <CreatorPageSidebar />
      </aside>
      <main className="ml-64 flex-1 overflow-y-auto bg-gray-50 min-h-screen">
        <PageHeader
          page={page}
          isEditing={isEditing}
          dirty={dirty}
          onSave={handleSave}
          onDiscard={handleDiscard}
          onPublish={handlePublish}
        />
        <HeroSection page={page} isEditing={isEditing} />
        <PageMetaSection
          page={page}
          localName={localName}
          setLocalName={setLocalName}
          localTagline={localTagline}
          setLocalTagline={setLocalTagline}
          isEditing={isEditing}
        />
        <SecondaryNav />
        <div className="flex pt-10 pb-30 justify-center">
          <PageCheckList />
        </div>
      </main>
    </div>
  );
}