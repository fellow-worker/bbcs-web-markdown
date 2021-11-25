import { Book } from "types";

export const books = [
  { abr: 'gen', term: 'Genesis' },
  { abr: 'exo', term: 'Exodus' },
  { abr: 'lev', term: 'Leviticus' },
  { abr: 'num', term: 'Numeri' },
  { abr: 'deu', term: 'Deuteronomium' },
  { abr: 'jos', term: 'Jozua' },
  { abr: 'jdg', term: 'Richteren' },
  { abr: 'rut', term: 'Ruth' },
  { abr: '1sa', term: '1 Samuël' },
  { abr: '1sa', term: '1 Samuel' },
  { abr: '2sa', term: '2 Samuël' },
  { abr: '2sa', term: '2 Samuel' },
  { abr: '1ki', term: '1 Koningen' },
  { abr: '2ki', term: '2 Koningen' },
  { abr: '1ch', term: '1 Kronieken' },
  { abr: '2ch', term: '2 Kronieken' },
  { abr: 'ezr', term: 'Ezra' },
  { abr: 'neh', term: 'Nehemia' },
  { abr: 'est', term: 'Esther' },
  { abr: 'est', term: 'Ester' },
  { abr: 'job', term: 'Job' },
  { abr: 'psa', term: 'Psalmen' },
  { abr: 'psa', term: 'Psalm' },
  { abr: 'pro', term: 'Spreuken' },
  { abr: 'ecc', term: 'Prediker' },
  { abr: 'sng', term: 'Hooglied' },
  { abr: 'isa', term: 'Jesaja' },
  { abr: 'jer', term: 'Jeremia' },
  { abr: 'lam', term: 'Klaagliederen' },
  { abr: 'ezk', term: 'Ezechiël' },
  { abr: 'ezk', term: 'Ezechiël' },
  { abr: 'dan', term: 'Daniël' },
  { abr: 'dan', term: 'Daniel' },
  { abr: 'hos', term: 'Hosea' },
  { abr: 'jol', term: 'Joël' },
  { abr: 'jol', term: 'Joel' },
  { abr: 'amo', term: 'Amos' },
  { abr: 'oba', term: 'Obadja' },
  { abr: 'jon', term: 'Jona' },
  { abr: 'mic', term: 'Micha' },
  { abr: 'nam', term: 'Nahum' },
  { abr: 'hab', term: 'Habakuk' },
  { abr: 'zep', term: 'Sefanja' },
  { abr: 'zep', term: 'Sephanja' },
  { abr: 'hag', term: 'Haggaï' },
  { abr: 'hag', term: 'Haggai' },
  { abr: 'zec', term: 'Zacharia' },
  { abr: 'mal', term: 'Maleachi' },
  { abr: 'mat', term: 'Matteüs' },
  { abr: 'mat', term: 'Matteus' },
  { abr: 'mat', term: 'Mattheus' },
  { abr: 'mat', term: 'Mattheüs' },
  { abr: 'mrk', term: 'Marcus' },
  { abr: 'mrk', term: 'Markus' },
  { abr: 'luk', term: 'Lucas' },
  { abr: 'luk', term: 'Lukas' },
  { abr: 'jhn', term: 'Johannes', ignorePrefixes: ['3 ', '1 ', '2 '] },
  { abr: 'act', term: 'Handelingen' },
  { abr: 'rom', term: 'Romeinen' },
  { abr: '1co', term: '1 Korintiërs' },
  { abr: '1co', term: '1 Korinthe' },
  { abr: '2co', term: '2 Korintiërs' },
  { abr: '2co', term: '2 Korinthe' },
  { abr: 'gal', term: 'Galaten' },
  { abr: 'eph', term: 'Efeziërs' },
  { abr: 'eph', term: 'Efeze' },
  { abr: 'php', term: 'Filippenzen' },
  { abr: 'php', term: 'Filippi' },
  { abr: 'col', term: 'Kolossenzen' },
  { abr: 'col', term: 'Kolosse' },
  { abr: '1th', term: '1 Tessalonicenzen' },
  { abr: '1th', term: '1 Thessalonicenzen' },
  { abr: '1th', term: '1 Thessalonika' },
  { abr: '1th', term: '1 Tessalonika' },
  { abr: '2th', term: '2 Tessalonicenzen' },
  { abr: '2th', term: '2 Thessalonicenzen' },
  { abr: '2th', term: '2 Thessalonika' },
  { abr: '2th', term: '2 Tessalonika' },
  { abr: '1ti', term: '1 Timoteüs' },
  { abr: '1ti', term: '1 Timotheüs' },
  { abr: '1ti', term: '1 Timoteus' },
  { abr: '1ti', term: '1 Timotheus' },
  { abr: '2ti', term: '1 Timoteüs' },
  { abr: '2ti', term: '2 Timotheüs' },
  { abr: '2ti', term: '2 Timoteus' },
  { abr: '2ti', term: '2 Timotheus' },
  { abr: 'tit', term: 'Titus' },
  { abr: 'phm', term: 'Filemon' },
  { abr: 'heb', term: 'Hebreeën' },
  { abr: 'jas', term: 'Jakobus' },
  { abr: '1pe', term: '1 Petrus' },
  { abr: '2pe', term: '2 Petrus' },
  { abr: '1jn', term: '1 Johannes' },
  { abr: '2jn', term: '2 Johannes' },
  { abr: '3jn', term: '3 Johannes' },
  { abr: 'jud', term: 'Judas' },
  { abr: 'rev', term: 'Openbaring' },
] as Book[]
