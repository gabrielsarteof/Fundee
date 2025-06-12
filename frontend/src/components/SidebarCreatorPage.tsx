'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAuth } from '@/hooks/useAuth';
import { useMyPage } from '@/hooks/useMyPage';
import { SignOutIcon } from '@primer/octicons-react';
import { getAvatarUrl } from '@/utils/avatar';
import type { components } from '@/types/api-schema';
import Link from 'next/link';

type PageResponseDto = components['schemas']['PageResponseDto'];

export default function SidebarCreatorPage() {
  const { address, logout } = useAuth();
  const { data: page, isLoading } = useMyPage();

  if (isLoading) {
    return <p>Carregando perfil…</p>;
  }

  if (!page) {
    return null;
  }

  const avatarSrc = page.avatarUrl || getAvatarUrl(page.name);
  const displayName = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Conectar';

  return (
    <div className="relative flex items-center space-x-2">
      <Menu as="div" className="relative flex-1">
        <MenuButton className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-full focus:outline-none">
          <img
            src={avatarSrc}
            alt={page.name}
            className="w-8 h-8 rounded-md mr-2 object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{page.name}</p>
            <p className="text-xs text-gray-500">Criador</p>
          </div>
        </MenuButton>
        <MenuItems className="origin-bottom-left w-65 absolute bottom-full left-0 pt-3 pb-1 mb-2 w-56 bg-white focus:outline-none rounded-md shadow-menu-dropdown z-20">
          <MenuItem>
            {({ active }) => (
              <Link
                href="/"
                className={`flex items-center px-4 py-3 text-sm font-medium text-gray-900 ${active ? 'bg-gray-100' : ''}`}
              >
                {address ? (
                  <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
                ) : (
                  <img
                    src="/default-avatar.png"
                    alt="Avatar padrão"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="ml-3">{displayName}</span>
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logout}
                className={`flex items-center w-full text-left p-4 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}
              >
                <SignOutIcon className="h-4 w-4 mr-3" />
                Sair
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
