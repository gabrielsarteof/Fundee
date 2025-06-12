'use client';

import React, { useState } from 'react';
import randomColor from 'randomcolor';
import { FileMediaIcon } from '@primer/octicons-react';
import type { components } from '@/types/api-schema';

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
  const c1 = getColor(seed);
  const c2 = getColor(seed + '_alt');
  return { background: `linear-gradient(to right, ${c1}, ${c2})` as const };
}

const HeroSection: React.FC<{ page: PageResponseDto; isEditing: boolean }> = ({ page, isEditing }) => {
  const [isBannerHover, setIsBannerHover] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);
  const [isAvatarHover, setIsAvatarHover] = useState(false);
  const [isAvatarIconHover, setIsAvatarIconHover] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-full"
        onMouseEnter={() => isEditing && setIsBannerHover(true)}
        onMouseLeave={() => { setIsBannerHover(false); setIsBtnHover(false); }}
      >
        {page.bannerUrl ? (
          <img src={page.bannerUrl} alt={page.name} className="w-full h-80 object-cover" />
        ) : (
          <div className="w-full h-80" style={getBannerStyle(page.name)} />
        )}

        {isEditing && isBannerHover && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="pointer-events-auto"
              onMouseEnter={() => setIsBtnHover(true)}
              onMouseLeave={() => setIsBtnHover(false)}
            >
              <button className="bg-black/50 text-white text-sm px-5 py-3 rounded-xl inline-flex items-center">
                <FileMediaIcon className="mr-2" size={16} /> Enviar imagem de capa
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

      {/* Avatar absolute within banner container */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <div
          className="relative w-32 h-32"
          onMouseEnter={() => isEditing && setIsAvatarHover(true)}
          onMouseLeave={() => { setIsAvatarHover(false); setIsAvatarIconHover(false); }}
        >
          {page.avatarUrl ? (
            <img src={page.avatarUrl} alt={page.name} className="w-32 h-32 rounded-3xl border-4 border-white object-cover" />
          ) : (
            <img src={getAvatarUrl(page.name)} alt={page.name} className="w-32 h-32 rounded-3xl border-4 border-white object-cover" />
          )}

          {isEditing && isAvatarHover && (
            <div className="absolute bottom-0 right-0 pointer-events-none">
              <div
                className="pointer-events-auto bg-white rounded-full p-2 shadow-lg cursor-pointer"
                onMouseEnter={() => setIsAvatarIconHover(true)}
                onMouseLeave={() => setIsAvatarIconHover(false)}
              >
                <FileMediaIcon className="w-5 h-5 text-gray-700" />
              </div>

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
  );
};

export default HeroSection;