'use client';
import Image from 'next/image';
import {
  HomeFillIcon,
  TelescopeFillIcon,
  CommentDiscussionIcon,
  BellFillIcon,
  GearIcon,
} from '@primer/octicons-react';
import SidebarProfile from '@/components/SidebarProfile';
import SidebarNavItem from '@/components/SidebarNavItem';

const navItems = [
  { label: 'Página inicial', href: '/', icon: HomeFillIcon },
  { label: 'Explorar',       href: '/explore', icon: TelescopeFillIcon },
  { label: 'Comunidade',     href: '/community', icon: CommentDiscussionIcon },
  { label: 'Notificações',   href: '/notifications', icon: BellFillIcon },
  { label: 'Configurações',  href: '/settings', icon: GearIcon },
];

interface SidebarProps {
  active?: string;
}

export default function Sidebar({ active = '/' }: SidebarProps) {
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
      </nav>

      {/* Profile & Actions */}
      <div className="mt-auto">
        <SidebarProfile />
      </div>
    </aside>
  );
}
