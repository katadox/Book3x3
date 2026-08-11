import type { Book } from '../types/book';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/id/';

export async function searchBooks(query: string, signal?: AbortSignal): Promise<Book[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Request cover_edition_key and edition_key to find covers for works without direct cover_i
  const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(trimmed)}&limit=30&fields=key,title,author_name,first_publish_year,isbn,cover_i,cover_edition_key,edition_key`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Open Library API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.docs || !Array.isArray(data.docs)) {
      return [];
    }

    // Prioritize search result docs that possess high-quality cover IDs or edition keys
    const sortedDocs = data.docs.slice().sort((a: any, b: any) => {
      const hasCoverA = a.cover_i || a.cover_edition_key ? 2 : (a.edition_key || a.isbn ? 1 : 0);
      const hasCoverB = b.cover_i || b.cover_edition_key ? 2 : (b.edition_key || b.isbn ? 1 : 0);
      return hasCoverB - hasCoverA;
    });

    return sortedDocs.slice(0, 24).map((doc: any): Book => {
      const coverId = doc.cover_i;
      const coverEditionKey = doc.cover_edition_key;
      const editionKey = Array.isArray(doc.edition_key) && doc.edition_key.length > 0 ? doc.edition_key[0] : undefined;
      const primaryIsbn = Array.isArray(doc.isbn) && doc.isbn.length > 0 ? doc.isbn[0] : undefined;
      
      let coverUrl = '';
      if (coverId) {
        coverUrl = `${OPEN_LIBRARY_COVER_URL}${coverId}-L.jpg`;
      } else if (coverEditionKey) {
        coverUrl = `https://covers.openlibrary.org/b/olid/${coverEditionKey}-L.jpg`;
      } else if (editionKey) {
        coverUrl = `https://covers.openlibrary.org/b/olid/${editionKey}-L.jpg`;
      } else if (primaryIsbn) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${primaryIsbn}-L.jpg`;
      } else {
        coverUrl = createCoverPlaceholder(doc.title || 'Untitled', Array.isArray(doc.author_name) ? doc.author_name[0] : 'Unknown Author');
      }

      const authors = Array.isArray(doc.author_name) ? doc.author_name.join(', ') : (doc.author_name || 'Unknown Author');

      return {
        id: doc.key || `ol-${Math.random().toString(36).substring(2, 9)}`,
        title: doc.title || 'Untitled Book',
        author: authors,
        firstPublishYear: doc.first_publish_year,
        isbn: primaryIsbn,
        coverId: coverId,
        coverUrl: coverUrl,
        openLibraryUrl: doc.key ? `https://openlibrary.org${doc.key}` : undefined,
      };
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return [];
    }
    console.error('Error fetching books from Open Library:', error);
    throw error;
  }
}

export function createCoverPlaceholder(title: string, author: string): string {
  const safeTitle = escapeXml(title.length > 40 ? title.substring(0, 37) + '...' : title);
  const safeAuthor = escapeXml(author.length > 30 ? author.substring(0, 27) + '...' : author);
  
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    ['#1e293b', '#0f172a', '#d97706'],
    ['#311b92', '#1a237e', '#80deea'],
    ['#37474f', '#263238', '#ffb74d'],
    ['#4a148c', '#311b92', '#f48fb1'],
    ['#1b5e20', '#004d40', '#a5d6a7'],
  ];
  const [bg1, bg2, accent] = colors[hash % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
      <linearGradient id="spine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#000" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#000" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="300" height="450" fill="url(#g)" />
    <rect x="0" y="0" width="20" height="450" fill="url(#spine)" />
    <rect x="30" y="40" width="240" height="370" rx="4" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="4 4" />
    <circle cx="150" cy="140" r="32" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2" />
    <path d="M140 132 h20 M150 122 v20" stroke="${accent}" stroke-width="3" stroke-linecap="round" />
    <text x="150" y="230" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" width="220">${safeTitle}</text>
    <text x="150" y="270" font-family="sans-serif" font-size="14" fill="${accent}" text-anchor="middle">${safeAuthor}</text>
    <text x="150" y="380" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle" letter-spacing="2">BOOK3X3</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
