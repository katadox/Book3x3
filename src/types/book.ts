export interface Book {
  id: string;
  title: string;
  author: string;
  firstPublishYear?: number | string;
  isbn?: string;
  coverId?: number | string;
  coverUrl: string;
  openLibraryUrl?: string;
}

export type LayoutStyle = 'classic' | 'minimal' | 'cinematic' | 'library' | 'poster';

export type BackgroundMode = 'dark' | 'light' | 'dark-gradient' | 'light-gradient' | 'sunset' | 'custom';

export type GridSpacing = 'none' | 'small' | 'medium' | 'large';

export type BorderRadius = 'none' | 'small' | 'medium' | 'large';

export type FontFamily = 'sans' | 'serif' | 'display' | 'mono';

export interface CustomizationSettings {
  layoutStyle: LayoutStyle;
  backgroundMode: BackgroundMode;
  customBackgroundColor: string;
  gridSpacing: GridSpacing;
  borderRadius: BorderRadius;
  showTitle: boolean;
  showAuthor: boolean;
  showYear: boolean;
  customTitle: string;
  fontFamily: FontFamily;
  resolution: '1080' | '2048';
}

export interface GridState {
  books: (Book | null)[];
  settings: CustomizationSettings;
}

export interface ExampleGrid {
  id: string;
  title: string;
  description: string;
  category: string;
  books: Book[];
  settings: Partial<CustomizationSettings>;
}
