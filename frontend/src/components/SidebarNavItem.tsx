'use client';
import Link from 'next/link';
import React from 'react';

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}

export default function SidebarNavItem({
  label,
  href,
  icon: Icon,
  active = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={
        `flex items-center px-4 py-2.5 mb-2.5 font-medium text-sm hover:bg-gray-100 transition rounded-md ` +
        (active ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700')
      }
    >
      <Icon className="h-4 w-4 mr-3" />
      <span>{label}</span>
    </Link>
  );
}