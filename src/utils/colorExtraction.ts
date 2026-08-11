import type { Book } from '../types/book';

export async function extractAutoThemeFromBooks(books: (Book | null)[]): Promise<{ gradient: string; primaryColor: string }> {
  const activeBooks = books.filter((b): b is Book => b !== null && Boolean(b.coverUrl));

  if (activeBooks.length === 0) {
    return {
      gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
      primaryColor: '#161b22',
    };
  }

  const sampledColors: { r: number; g: number; b: number }[] = [];
  const sampleTargets = activeBooks.slice(0, 5);

  for (const book of sampleTargets) {
    try {
      const rgb = await extractImageDominantRGB(book.coverUrl);
      if (rgb) {
        sampledColors.push(rgb);
      }
    } catch {
      // Ignore load issues
    }
  }

  if (sampledColors.length === 0) {
    return {
      gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      primaryColor: '#1f2937',
    };
  }

  const primary = sampledColors[0];
  const secondary = sampledColors[1] || darkenColor(primary, 0.4);

  const hex1 = rgbToHex(primary.r, primary.g, primary.b);
  const hex2 = rgbToHex(secondary.r, secondary.g, secondary.b);

  const darkHex1 = darkenColorHex(hex1, 0.6);
  const darkHex2 = darkenColorHex(hex2, 0.7);

  return {
    gradient: `linear-gradient(135deg, ${darkHex1} 0%, #0d1117 50%, ${darkHex2} 100%)`,
    primaryColor: darkHex1,
  };
}

function extractImageDominantRGB(url: string): Promise<{ r: number; g: number; b: number } | null> {
  return new Promise((resolve) => {
    if (url.startsWith('data:image/svg+xml')) {
      resolve({ r: 25, g: 35, b: 50 });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    const timer = setTimeout(() => {
      resolve(null);
    }, 2000);

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        canvas.width = 40;
        canvas.height = 60;
        ctx.drawImage(img, 0, 0, 40, 60);

        const imgData = ctx.getImageData(0, 0, 40, 60).data;
        let rSum = 0, gSum = 0, bSum = 0, count = 0;

        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          if (a < 200) continue;
          
          const isWhite = r > 240 && g > 240 && b > 240;
          const isBlack = r < 15 && g < 15 && b < 15;
          if (isWhite || isBlack) continue;

          rSum += r;
          gSum += g;
          bSum += b;
          count++;
        }

        if (count === 0) {
          resolve({ r: 30, g: 40, b: 60 });
          return;
        }

        resolve({
          r: Math.round(rSum / count),
          g: Math.round(gSum / count),
          b: Math.round(bSum / count),
        });
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
  });
}

function darkenColor(rgb: { r: number; g: number; b: number }, factor: number): { r: number; g: number; b: number } {
  return {
    r: Math.round(rgb.r * (1 - factor)),
    g: Math.round(rgb.g * (1 - factor)),
    b: Math.round(rgb.b * (1 - factor)),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function darkenColorHex(hex: string, factor: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.floor(r * (1 - factor));
  g = Math.floor(g * (1 - factor));
  b = Math.floor(b * (1 - factor));

  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
