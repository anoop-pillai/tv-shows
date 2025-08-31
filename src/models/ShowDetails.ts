interface Schedule {
  time: string;
  days: string[];
}

interface Rating {
  average: number;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Link {
  href: string;
}

interface PreviousEpisode extends Link {
  name: string;
}

interface Links {
  self: Link;
  previousepisode: PreviousEpisode;
}

interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Partial<Schedule>;
  rating:  Partial<Rating>;
  weight: number;
  network: Network | null;
  webChannel: null;
  dvdCountry: null;
  externals:  Partial<Externals>;
  image: Image;
  summary: string;
  updated: number;
}
