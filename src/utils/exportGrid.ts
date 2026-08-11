import type { Book, CustomizationSettings } from '../types/book';

export async function exportGridToCanvas(
  books: (Book | null)[],
  settings: CustomizationSettings,
  targetSize: number = 1080
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D canvas context');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw Background
  drawBackground(ctx, targetSize, settings);

  const isSeamlessNone = settings.gridSpacing === 'none';

  // 2. Calculate Header & Footer Heights
  const hasTitle = Boolean(settings.customTitle.trim());
  const headerHeight = hasTitle ? targetSize * 0.10 : (isSeamlessNone ? 0 : targetSize * 0.04);
  const footerHeight = isSeamlessNone ? 0 : targetSize * 0.05;

  if (hasTitle) {
    drawTitle(ctx, targetSize, settings);
  }

  // 3. Calculate 3x3 Grid Layout Parameters
  const gridTop = headerHeight;
  const gridHeight = targetSize - gridTop - footerHeight;
  
  const spacingMap = {
    none: 0,
    small: targetSize * 0.015,
    medium: targetSize * 0.03,
    large: targetSize * 0.045,
  };
  const gap = spacingMap[settings.gridSpacing];

  const gridMarginX = isSeamlessNone ? 0 : targetSize * 0.04;
  const availableWidth = targetSize - (gridMarginX * 2) - (gap * 2);
  const cellWidth = availableWidth / 3;

  const availableHeight = gridHeight - (gap * 2);
  const cellHeight = availableHeight / 3;

  const radiusMap = {
    none: 0,
    small: targetSize * 0.008,
    medium: targetSize * 0.018,
    large: targetSize * 0.03,
  };
  const cornerRadius = isSeamlessNone ? 0 : radiusMap[settings.borderRadius];

  // 4. Preload Cover Images with CORS Proxy / Blob conversion
  const loadedImages = await Promise.all(
    books.map((b) => (b && b.coverUrl ? loadCanvasImage(b.coverUrl) : Promise.resolve(null)))
  );

  // 5. Draw 9 Cells
  for (let index = 0; index < 9; index++) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const x = gridMarginX + col * (cellWidth + gap);
    const y = gridTop + row * (cellHeight + gap);

    const book = books[index];
    const img = loadedImages[index];

    drawCell(ctx, x, y, cellWidth, cellHeight, cornerRadius, book, img, settings);
  }

  // 6. Draw Footer Branding (omitted when gridSpacing is 'none' for pure seamless collage)
  if (!isSeamlessNone) {
    drawFooterBranding(ctx, targetSize, settings);
  }

  return canvas;
}

function drawBackground(ctx: CanvasRenderingContext2D, size: number, settings: CustomizationSettings) {
  const { backgroundMode, customBackgroundColor } = settings;

  if (backgroundMode === 'custom' && customBackgroundColor) {
    ctx.fillStyle = customBackgroundColor;
    ctx.fillRect(0, 0, size, size);
    return;
  }

  switch (backgroundMode) {
    case 'light':
      ctx.fillStyle = '#f8fafc';
      break;
    case 'light-gradient': {
      const g = ctx.createLinearGradient(0, 0, size, size);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = g;
      break;
    }
    case 'dark-gradient': {
      const g = ctx.createLinearGradient(0, 0, size, size);
      g.addColorStop(0, '#0f172a');
      g.addColorStop(0.5, '#0b0d12');
      g.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = g;
      break;
    }
    case 'sunset': {
      const g = ctx.createLinearGradient(0, 0, size, size);
      g.addColorStop(0, '#1c1917');
      g.addColorStop(0.5, '#451a03');
      g.addColorStop(1, '#0f172a');
      ctx.fillStyle = g;
      break;
    }
    case 'dark':
    default:
      ctx.fillStyle = '#0b0d12';
      break;
  }
  ctx.fillRect(0, 0, size, size);
}

function drawTitle(ctx: CanvasRenderingContext2D, size: number, settings: CustomizationSettings) {
  const isLight = settings.backgroundMode === 'light' || settings.backgroundMode === 'light-gradient';
  ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const fontMap: Record<string, string> = {
    serif: `'Playfair Display', Georgia, serif`,
    sans: `'Outfit', 'Inter', sans-serif`,
    display: `'Cinzel', 'Playfair Display', serif`,
    mono: `'JetBrains Mono', monospace`,
  };

  const selectedFont = fontMap[settings.fontFamily] || fontMap.serif;
  const fontSize = Math.round(size * 0.032);

  ctx.font = `600 ${fontSize}px ${selectedFont}`;
  ctx.fillText(settings.customTitle.toUpperCase(), size / 2, size * 0.05);

  ctx.strokeStyle = '#dfa649';
  ctx.lineWidth = Math.max(2, size * 0.002);
  ctx.beginPath();
  ctx.moveTo(size * 0.42, size * 0.08);
  ctx.lineTo(size * 0.58, size * 0.08);
  ctx.stroke();
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  book: Book | null,
  img: HTMLImageElement | null,
  settings: CustomizationSettings
) {
  ctx.save();

  // STRICT CELL CLIPPING: Always clip to cell bounds so text overlays/images never bleed into adjacent cells or outer margins
  ctx.beginPath();
  if (radius > 0) {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.clip();

  const isLight = settings.backgroundMode === 'light' || settings.backgroundMode === 'light-gradient';
  ctx.fillStyle = isLight ? '#e2e8f0' : '#141822';
  ctx.fillRect(x, y, w, h);

  if (book) {
    if (img && img.width > 10 && img.height > 10) {
      const imgRatio = img.width / img.height;
      const cellRatio = w / h;
      let drawW = w;
      let drawH = h;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > cellRatio) {
        drawW = h * imgRatio;
        offsetX = (w - drawW) / 2;
      } else {
        drawH = w / imgRatio;
        offsetY = (h - drawH) / 2;
      }

      ctx.drawImage(img, x + offsetX, y + offsetY, drawW, drawH);
    } else {
      drawVectorBookFallback(ctx, x, y, w, h, book);
    }

    drawBookOverlayAndLabels(ctx, x, y, w, h, book, settings);
  } else {
    ctx.strokeStyle = isLight ? '#cbd5e1' : '#273043';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

    ctx.fillStyle = isLight ? '#94a3b8' : '#475569';
    ctx.font = `500 ${Math.round(w * 0.08)}px 'Inter', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Empty Slot', x + w / 2, y + h / 2);
  }

  ctx.restore();
}

function drawVectorBookFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  book: Book
) {
  const hash = book.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const palettes = [
    ['#1e293b', '#0f172a', '#f59e0b'],
    ['#311b92', '#1a237e', '#38bdf8'],
    ['#37474f', '#263238', '#fbbf24'],
    ['#4a148c', '#311b92', '#f472b6'],
    ['#064e3b', '#022c22', '#34d399'],
  ];
  const [c1, c2, accent] = palettes[hash % palettes.length];

  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(x, y, w * 0.08, h);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.8);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(w * 0.08)}px 'Playfair Display', serif`;
  
  const words = book.title.split(' ');
  let line1 = words.slice(0, 4).join(' ');
  if (line1.length > 24) line1 = line1.substring(0, 22) + '..';

  ctx.fillText(line1, x + w / 2, y + h * 0.45);

  ctx.fillStyle = accent;
  ctx.font = `500 ${Math.round(w * 0.06)}px 'Outfit', sans-serif`;
  let authorShort = book.author;
  if (authorShort.length > 20) authorShort = authorShort.substring(0, 18) + '..';
  ctx.fillText(authorShort, x + w / 2, y + h * 0.6);
}

function drawBookOverlayAndLabels(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  book: Book,
  settings: CustomizationSettings
) {
  const { layoutStyle, showTitle, showAuthor, showYear } = settings;

  if (layoutStyle === 'minimal' && !showTitle && !showAuthor && !showYear) {
    return;
  }

  if (showTitle || showAuthor || showYear) {
    const gradH = h * 0.42;
    const grad = ctx.createLinearGradient(x, y + h - gradH, x, y + h);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.6, 'rgba(0,0,0,0.7)');
    grad.addColorStop(1, 'rgba(0,0,0,0.92)');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y + h - gradH, w, gradH);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    let currentY = y + h - (h * 0.05);

    if (showYear && book.firstPublishYear) {
      ctx.font = `400 ${Math.round(w * 0.055)}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(String(book.firstPublishYear), x + w / 2, currentY);
      currentY -= h * 0.06;
    }

    if (showAuthor && book.author) {
      ctx.font = `500 ${Math.round(w * 0.06)}px 'Outfit', sans-serif`;
      ctx.fillStyle = '#dfa649';
      let authorName = book.author;
      if (authorName.length > 24) authorName = authorName.substring(0, 22) + '...';
      ctx.fillText(authorName, x + w / 2, currentY);
      currentY -= h * 0.07;
    }

    if (showTitle && book.title) {
      ctx.font = `600 ${Math.round(w * 0.07)}px 'Playfair Display', serif`;
      ctx.fillStyle = '#ffffff';
      let titleText = book.title;
      if (titleText.length > 30) titleText = titleText.substring(0, 28) + '...';
      ctx.fillText(titleText, x + w / 2, currentY);
    }
  }

  if (layoutStyle === 'poster') {
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = Math.max(1, w * 0.015);
    ctx.strokeRect(x + w * 0.04, y + h * 0.04, w * 0.92, h * 0.92);
  }
}

function drawFooterBranding(ctx: CanvasRenderingContext2D, size: number, settings: CustomizationSettings) {
  const isLight = settings.backgroundMode === 'light' || settings.backgroundMode === 'light-gradient';
  ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
  ctx.font = `500 ${Math.round(size * 0.016)}px 'Outfit', sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('Created with Book3x3', size - (size * 0.05), size - (size * 0.025));
}

async function loadCanvasImage(url: string): Promise<HTMLImageElement | null> {
  if (!url) return null;

  const isValidImg = (img: HTMLImageElement | null): boolean => {
    return Boolean(img && img.width > 10 && img.height > 10);
  };

  if (url.startsWith('data:')) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(isValidImg(img) ? img : null);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const img = new Image();
      const loaded = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(isValidImg(img));
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });
      if (loaded) return img;
    }
  } catch {
    // Fallback
  }

  try {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const img = new Image();
      const loaded = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(isValidImg(img));
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });
      if (loaded) return img;
    }
  } catch {
    // Fallback
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const timer = setTimeout(() => {
      resolve(null);
    }, 4000);

    img.onload = () => {
      clearTimeout(timer);
      resolve(isValidImg(img) ? img : null);
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };

    img.src = url;
  });
}
