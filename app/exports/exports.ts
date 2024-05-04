import {style as tw} from 'twrnc';
// import colors from 'tailwind-colors';
import {tailwind} from 'easycolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
let colors = tailwind;

interface IEpisode {
  id: string;
  number: number;
  url: string;
}

interface IAnimeInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: IEpisode[];
}

interface IAnimeEntry {
  id?: string;
  title?: string;
  image?: string;
  url?: string;
  genres?: string[];
  episodeId?: string;
  episodeNumber?: number;
}

interface IAnimePage {
  currentPage: string;
  hasNextPage: boolean;
  results: IAnimeEntry[];
}


interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}

interface EpisodeData {
  headers: {
    Referer: string;
  };
  sources: Source[];
  download: string;
}

export {tw, colors,wp,hp};
export type {IAnimeEntry, IAnimePage, IEpisode, IAnimeInfo,EpisodeData};
