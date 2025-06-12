import randomColor from 'randomcolor';

function getColor(seed: string) {
  return randomColor({ seed, luminosity: 'light' });
}

export function getAvatarUrl(seed: string) {
  const bg = getColor(seed).replace('#', '');
  const seedEnc = encodeURIComponent(seed);
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seedEnc}&backgroundColor=${bg}&size=128`;
}
