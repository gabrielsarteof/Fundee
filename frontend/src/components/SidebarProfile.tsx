'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { EllipsisVerticalIcon } from 'lucide-react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useMyPage } from '@/hooks/useMyPage';
import type { components } from '@/types/api-schema';
import { getAvatarUrl } from '@/utils/avatar';
import { SignOutIcon } from '@primer/octicons-react';

type PageResponseDto = components['schemas']['PageResponseDto'];

export default function SidebarProfile() {
  const { address, logout } = useAuth();
  const { data: page, isLoading } = useMyPage();
  const router = useRouter();

  if (isLoading) {
    return <p>Carregando perfil…</p>;
  }

  const displayName = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Conectar';

  return (
    <div className="relative flex items-center space-x-2">
      <Menu as="div" className="relative flex-1">
        <MenuButton className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-full focus:outline-none">
          {address ? (
            <Jazzicon
              diameter={30}
              seed={jsNumberForAddress(address)}
            />
          ) : (
            <img
              src="/default-avatar.png"
              alt="Avatar padrão"
              className="w-8 h-8 rounded-full"
            />
          )}
          <div className="ml-3 text-left">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500">{page ? 'Criador' : 'Membro'}</p>
          </div>
        </MenuButton>

        <MenuItems className="origin-bottom-left w-65 absolute bottom-full left-0 pt-3 pb-1 mb-2 w-56 bg-white focus:outline-none rounded-md shadow-menu-dropdown z-20">
          {page ? (
            <MenuItem>
              {({ active }) => {
                const avatarSrc = page.avatarUrl || getAvatarUrl(page.name);
                return (
                  <Link
                    href={`/page/${page.slug}`}
                    onMouseEnter={() => router.prefetch(`/page/${page.slug}`)}
                    className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
                  >
                    <img
                      src={avatarSrc}
                      alt={page.name}
                      className="w-8 h-8 rounded-md mr-2 object-cover"
                    />
                    {page.name}
                  </Link>
                );
              }}
            </MenuItem>
          ) : (
            <MenuItem>
              {({ active }) => (
                <Link
                  href="/create-page"
                  className={`block p-4 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                >
                  Criar Página
                </Link>
              )}
            </MenuItem>
          )}
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logout}
                className={`flex items-center w-full text-left p-4 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}
              >
                <SignOutIcon className="h-4 w-4 mr-3"/>
                Sair
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}