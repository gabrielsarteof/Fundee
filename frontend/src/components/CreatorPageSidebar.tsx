'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  HomeFillIcon,
  CommentDiscussionIcon,
  BellFillIcon,
  GearIcon,
  FileMediaIcon,
  CreditCardIcon,
  ProjectRoadmapIcon,
  RocketIcon,
  FeedPlusIcon,
} from '@primer/octicons-react';
import SidebarNavItem from '@/components/SidebarNavItem';
import SideBarCreatorPage from './SidebarCreatorPage';

const navItems = [
  { label: 'Minha página', href: '/', icon: HomeFillIcon },
  { label: 'Biblioteca', href: '/biblioteca', icon: FileMediaIcon },
  { label: 'Informações', href: '/informacoes', icon: ProjectRoadmapIcon },
  { label: 'Pagamentos', href: '/pagamentos', icon: CreditCardIcon },
  { label: 'Promoções', href: '/promocoes', icon: RocketIcon },
  { label: 'Comunidade', href: '/comunidade', icon: CommentDiscussionIcon },
  { label: 'Notificações', href: '/notificacoes', icon: BellFillIcon },
  { label: 'Configurações', href: '/configuracoes', icon: GearIcon },
];

interface SidebarProps {
  active?: string;
}

export default function CreatorPageSidebar({ active = '/' }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed top-0 left-0 flex flex-col px-2 py-4">
      <div className="h-16 flex items-center px-4">
        <Image
          className="mr-2"
          src="/logo.svg"
          alt="Galaxy Bay Logo"
          width={30}
          height={30}
        />
        <h1 className="font-poppins text-xl text-indigo-900">Galaxy Bay</h1>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map(({ label, href, icon }) => (
          <SidebarNavItem
            key={href}
            label={label}
            href={href}
            icon={icon}
            active={active === href}
          />
        ))}

        {/* botão “Criar NFT” agora é um Link para a nossa página de criação */}
        <Link
          href="/create-nft"
          className="flex w-full items-center justify-center mt-3 px-4 py-2.5 mb-2.5 font-semibold text-sm border border-gray-300 rounded-lg hover:border-gray-700 transition"
        >
          <FeedPlusIcon className="h-4 w-4 mr-3" />
          <span>Criar NFT</span>
        </Link>
      </nav>

      {/* Profile & Actions */}
      <div className="mt-auto">
        <SideBarCreatorPage />
      </div>
    </aside>
  );
}
