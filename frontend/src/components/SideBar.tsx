import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, UsersIcon, BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const navItems = [
  { label: 'Página inicial', href: '/', icon: HomeIcon },
  { label: 'Explorar', href: '/explore', icon: MagnifyingGlassIcon },
  { label: 'Comunidade', href: '/community', icon: UsersIcon },
  { label: 'Notificações', href: '/notifications', icon: BellIcon },
  { label: 'Configurações', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ active = '/' }: { active?: string }) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed top-0 left-0 flex flex-col px-2 py-4">
      <div className="h-16 flex items-center px-4">
        <Image src="/logo.svg" alt="Meta Canvas Logo" width={30} height={30} />
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = active === href;
          return (
            <Link
              key={href}
              href={href}
              className={
                `flex items-center px-4 py-2 mb-1 hover:bg-gray-100 transition rounded ` +
                (isActive
                  ? 'bg-gray-200 font-semibold'
                  : 'text-gray-700')
              }
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
