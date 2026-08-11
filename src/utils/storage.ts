import type { GridState, CustomizationSettings } from '../types/book';

const STORAGE_KEY = 'book3x3_grid_state_v3';

export const DEFAULT_SETTINGS: CustomizationSettings = {
  layoutStyle: 'classic',
  backgroundMode: 'dark-gradient',
  customBackgroundColor: '#111827',
  gridSpacing: 'medium',
  borderRadius: 'medium',
  showTitle: true,
  showAuthor: true,
  showYear: true,
  customTitle: '',
  fontFamily: 'serif',
  resolution: '1080',
};

// Initial state is strictly an empty 3x3 grid (9 empty slots)
export const EMPTY_BOOKS: (null)[] = Array(9).fill(null);

export const DEFAULT_GRID_STATE: GridState = {
  books: [...EMPTY_BOOKS],
  settings: { ...DEFAULT_SETTINGS },
};

export function loadGridState(): GridState {
  try {
    // Purge any legacy cached localstorage keys
    localStorage.removeItem('book3x3_grid_state_v1');
    localStorage.removeItem('book3x3_grid_state_v2');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { books: [...EMPTY_BOOKS], settings: { ...DEFAULT_SETTINGS } };

    const parsed = JSON.parse(raw);
    
    const books = Array.isArray(parsed.books)
      ? parsed.books.slice(0, 9).concat(Array(Math.max(0, 9 - parsed.books.length)).fill(null))
      : [...EMPTY_BOOKS];

    const settings: CustomizationSettings = {
      ...DEFAULT_SETTINGS,
      ...(parsed.settings || {}),
    };

    return { books, settings };
  } catch (error) {
    console.warn('Failed to parse grid state from LocalStorage:', error);
    return { books: [...EMPTY_BOOKS], settings: { ...DEFAULT_SETTINGS } };
  }
}

export function saveGridState(state: GridState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save grid state to LocalStorage:', error);
  }
}

export function clearGridState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('book3x3_grid_state_v1');
    localStorage.removeItem('book3x3_grid_state_v2');
  } catch (error) {
    console.warn('Failed to clear grid state from LocalStorage:', error);
  }
}
