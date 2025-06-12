'use client';

import React from 'react';
import { EyeOff } from 'lucide-react';

const items = ['Página Inicial', 'Coleções', 'Compras', 'Assinatura', 'Sobre', 'Recomendações'];

const SecondaryNav: React.FC = () => (
  <nav className="mt-6 shadow">
    <div className="px-75">
      <ul className="flex justify-between px-6 py-3 text-gray-700 font-medium text-sm">
        {items.map((label) => (
          <li key={label} className="pb-2 hover:border-b-2 hover:border-gray-300 flex items-center justify-center">
            {label}
            {label === 'Compras' && <EyeOff className="w-4 h-4 ml-1" />}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default SecondaryNav;