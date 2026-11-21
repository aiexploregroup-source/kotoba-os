export interface BackgroundPreset {
  id: string;
  name: string;
  category: 'Nature' | 'Atmosphere' | 'Japanese';
  src: string;
  credit: string;
  link: string;
}

const unsplash = 'https://unsplash.com/';
const original = 'https://unsplash.com/license';

/**
 * Curated backgrounds downloaded at build time and served locally, so the
 * library works offline. Photographs are free-to-use Unsplash images; the
 * Japanese patterns are original SVG artwork bundled with the app.
 */
export const backgroundPresets: BackgroundPreset[] = [
  { id: 'alpine-dawn', name: 'Alpine Dawn', category: 'Nature', src: 'backgrounds/alpine-dawn.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'misty-pines', name: 'Misty Pines', category: 'Nature', src: 'backgrounds/misty-pines.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'starlit-ridge', name: 'Starlit Ridge', category: 'Atmosphere', src: 'backgrounds/starlit-ridge.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'still-water', name: 'Still Water', category: 'Nature', src: 'backgrounds/still-water.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'forest-light', name: 'Forest Light', category: 'Nature', src: 'backgrounds/forest-light.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'desert-dunes', name: 'Desert Dunes', category: 'Nature', src: 'backgrounds/desert-dunes.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'sunset-glow', name: 'Sunset Glow', category: 'Atmosphere', src: 'backgrounds/sunset-glow.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'valley-sunrise', name: 'Valley Sunrise', category: 'Nature', src: 'backgrounds/valley-sunrise.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'evergreen', name: 'Evergreen', category: 'Nature', src: 'backgrounds/evergreen.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'woodland-path', name: 'Woodland Path', category: 'Nature', src: 'backgrounds/woodland-path.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'mountain-mirror', name: 'Mountain Mirror', category: 'Nature', src: 'backgrounds/mountain-mirror.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'golden-hour', name: 'Golden Hour', category: 'Atmosphere', src: 'backgrounds/golden-hour.jpg', credit: 'Unsplash', link: unsplash },
  { id: 'seigaiha', name: 'Seigaiha Waves', category: 'Japanese', src: 'backgrounds/seigaiha.svg', credit: 'Original artwork', link: original },
  { id: 'sakura-drift', name: 'Sakura Drift', category: 'Japanese', src: 'backgrounds/sakura-drift.svg', credit: 'Original artwork', link: original },
  { id: 'midnight-grid', name: 'Midnight Grid', category: 'Japanese', src: 'backgrounds/midnight-grid.svg', credit: 'Original artwork', link: original },
  { id: 'aurora-ink', name: 'Aurora Ink', category: 'Atmosphere', src: 'backgrounds/aurora-ink.svg', credit: 'Original artwork', link: original },
];

export const presetById = (id: string | null | undefined) =>
  backgroundPresets.find((preset) => preset.id === id) ?? null;
