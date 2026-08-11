import type { ExampleGrid } from '../types/book';

export const CURATED_EXAMPLES: ExampleGrid[] = [
  {
    id: 'my-favorite-books',
    title: 'My Favorite Books',
    description: 'A personal selection of mind-bending fiction, philosophical epics, and genre-defining masterpieces.',
    category: 'Personal Favorites',
    settings: {
      layoutStyle: 'classic',
      backgroundMode: 'dark-gradient',
      fontFamily: 'serif',
      gridSpacing: 'medium',
      borderRadius: 'medium',
      showTitle: true,
      showAuthor: true,
      showYear: true,
      customTitle: 'My Favorite Books',
    },
    books: [
      {
        id: 'ol-1984',
        title: '1984',
        author: 'George Orwell',
        firstPublishYear: 1949,
        isbn: '9780451524935',
        coverId: 12643806,
        coverUrl: 'https://covers.openlibrary.org/b/id/12643806-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL1168007W/1984'
      },
      {
        id: 'ol-dune',
        title: 'Dune',
        author: 'Frank Herbert',
        firstPublishYear: 1965,
        isbn: '9780441172719',
        coverId: 9255566,
        coverUrl: 'https://covers.openlibrary.org/b/id/9255566-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL893415W/Dune'
      },
      {
        id: 'ol-pride',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        firstPublishYear: 1813,
        isbn: '9780141439518',
        coverId: 10427389,
        coverUrl: 'https://covers.openlibrary.org/b/id/10427389-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL66598W/Pride_and_Prejudice'
      },
      {
        id: 'ol-frankenstein',
        title: 'Frankenstein',
        author: 'Mary Shelley',
        firstPublishYear: 1818,
        isbn: '9780486282114',
        coverId: 10587747,
        coverUrl: 'https://covers.openlibrary.org/b/id/10587747-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL450066W/Frankenstein'
      },
      {
        id: 'ol-neuromancer',
        title: 'Neuromancer',
        author: 'William Gibson',
        firstPublishYear: 1984,
        isbn: '9780441569595',
        coverId: 11144007,
        coverUrl: 'https://covers.openlibrary.org/b/id/11144007-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL443425W/Neuromancer'
      },
      {
        id: 'ol-harry-potter-azkaban',
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J. K. Rowling',
        firstPublishYear: 1999,
        isbn: '9780439136358',
        coverId: 10521270,
        coverUrl: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL82563W/Harry_Potter_and_the_Prisoner_of_Azkaban'
      },
      {
        id: 'ol-hobbit',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        firstPublishYear: 1937,
        isbn: '9780007458424',
        coverId: 8406786,
        coverUrl: 'https://covers.openlibrary.org/b/id/8406786-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL27479W/The_Hobbit'
      },
      {
        id: 'ol-maze-runner',
        title: 'The Maze Runner',
        author: 'James Dashner',
        firstPublishYear: 2009,
        isbn: '9780385737951',
        coverId: 8231900,
        coverUrl: 'https://covers.openlibrary.org/b/id/8231900-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL15165449W/The_Maze_Runner'
      },
      {
        id: 'ol-5th-wave',
        title: 'The 5th Wave',
        author: 'Richard Yancey',
        firstPublishYear: 2013,
        isbn: '9780142425831',
        coverId: 8231980,
        coverUrl: 'https://covers.openlibrary.org/b/id/8231980-L.jpg',
        openLibraryUrl: 'https://openlibrary.org/works/OL16806969W/The_5th_Wave'
      }
    ]
  },
  {
    id: 'essential-fantasy',
    title: 'Essential High Fantasy',
    description: 'Immersive worlds, heroic quests, and legendary storytelling that defined fantasy literature.',
    category: 'Fantasy & Sci-Fi',
    settings: {
      layoutStyle: 'cinematic',
      backgroundMode: 'sunset',
      fontFamily: 'display',
      gridSpacing: 'small',
      borderRadius: 'small',
      showTitle: true,
      showAuthor: true,
      showYear: false,
      customTitle: 'Essential High Fantasy',
    },
    books: [
      {
        id: 'ol-hobbit-f',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        firstPublishYear: 1937,
        coverId: 8406786,
        coverUrl: 'https://covers.openlibrary.org/b/id/8406786-L.jpg'
      },
      {
        id: 'ol-name-wind',
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        firstPublishYear: 2007,
        coverId: 10459524,
        coverUrl: 'https://covers.openlibrary.org/b/id/10459524-L.jpg'
      },
      {
        id: 'ol-way-kings',
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        firstPublishYear: 2010,
        coverId: 8235118,
        coverUrl: 'https://covers.openlibrary.org/b/id/8235118-L.jpg'
      },
      {
        id: 'ol-game-thrones',
        title: 'A Game of Thrones',
        author: 'George R.R. Martin',
        firstPublishYear: 1996,
        coverId: 8231856,
        coverUrl: 'https://covers.openlibrary.org/b/id/8231856-L.jpg'
      },
      {
        id: 'ol-fellowship',
        title: 'The Fellowship of the Ring',
        author: 'J.R.R. Tolkien',
        firstPublishYear: 1954,
        coverId: 10522045,
        coverUrl: 'https://covers.openlibrary.org/b/id/10522045-L.jpg'
      },
      {
        id: 'ol-eye-world',
        title: 'The Eye of the World',
        author: 'Robert Jordan',
        firstPublishYear: 1990,
        coverId: 8234891,
        coverUrl: 'https://covers.openlibrary.org/b/id/8234891-L.jpg'
      },
      {
        id: 'ol-mistborn',
        title: 'Mistborn: The Final Empire',
        author: 'Brandon Sanderson',
        firstPublishYear: 2006,
        coverId: 8235086,
        coverUrl: 'https://covers.openlibrary.org/b/id/8235086-L.jpg'
      },
      {
        id: 'ol-lies-locke',
        title: 'The Lies of Locke Lamora',
        author: 'Scott Lynch',
        firstPublishYear: 2006,
        coverId: 8231920,
        coverUrl: 'https://covers.openlibrary.org/b/id/8231920-L.jpg'
      },
      {
        id: 'ol-priory-orange',
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        firstPublishYear: 2019,
        coverId: 10427495,
        coverUrl: 'https://covers.openlibrary.org/b/id/10427495-L.jpg'
      }
    ]
  },
  {
    id: 'dark-academia-aesthetic',
    title: 'Dark Academia',
    description: 'Secret societies, ancient languages, dusty libraries, and tragic obsession.',
    category: 'Aesthetic & Mood',
    settings: {
      layoutStyle: 'poster',
      backgroundMode: 'dark',
      fontFamily: 'serif',
      gridSpacing: 'medium',
      borderRadius: 'large',
      showTitle: true,
      showAuthor: true,
      showYear: true,
      customTitle: 'Dark Academia Core',
    },
    books: [
      {
        id: 'ol-secret-history',
        title: 'The Secret History',
        author: 'Donna Tartt',
        firstPublishYear: 1992,
        coverId: 12534960,
        coverUrl: 'https://covers.openlibrary.org/b/id/12534960-L.jpg'
      },
      {
        id: 'ol-dorian-gray',
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
        firstPublishYear: 1890,
        coverId: 10587812,
        coverUrl: 'https://covers.openlibrary.org/b/id/10587812-L.jpg'
      },
      {
        id: 'ol-frankenstein-da',
        title: 'Frankenstein',
        author: 'Mary Shelley',
        firstPublishYear: 1818,
        coverId: 10587747,
        coverUrl: 'https://covers.openlibrary.org/b/id/10587747-L.jpg'
      },
      {
        id: 'ol-babel',
        title: 'Babel',
        author: 'R.F. Kuang',
        firstPublishYear: 2022,
        coverId: 12845620,
        coverUrl: 'https://covers.openlibrary.org/b/id/12845620-L.jpg'
      },
      {
        id: 'ol-if-we-were-villains',
        title: 'If We Were Villains',
        author: 'M.L. Rio',
        firstPublishYear: 2017,
        coverId: 10427610,
        coverUrl: 'https://covers.openlibrary.org/b/id/10427610-L.jpg'
      },
      {
        id: 'ol-ninth-house',
        title: 'Ninth House',
        author: 'Leigh Bardugo',
        firstPublishYear: 2019,
        coverId: 10427650,
        coverUrl: 'https://covers.openlibrary.org/b/id/10427650-L.jpg'
      },
      {
        id: 'ol-starless-sea',
        title: 'The Starless Sea',
        author: 'Erin Morgenstern',
        firstPublishYear: 2019,
        coverId: 10427680,
        coverUrl: 'https://covers.openlibrary.org/b/id/10427680-L.jpg'
      },
      {
        id: 'ol-jonathan-strange',
        title: 'Jonathan Strange & Mr Norrell',
        author: 'Susanna Clarke',
        firstPublishYear: 2004,
        coverId: 8231940,
        coverUrl: 'https://covers.openlibrary.org/b/id/8231940-L.jpg'
      },
      {
        id: 'ol-jane-eyre',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        firstPublishYear: 1847,
        coverId: 10587790,
        coverUrl: 'https://covers.openlibrary.org/b/id/10587790-L.jpg'
      }
    ]
  }
];
