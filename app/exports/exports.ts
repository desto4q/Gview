import {style as tw} from 'twrnc';
// import colors from 'tailwind-colors';
import {tailwind} from 'easycolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Storage} from '../storage/storage';

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
  releaseDate?: string
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

let JSONParser = (item: any) => {
  try {
    return JSON.parse(item);
  } catch (err) {
    return err;
  }
};

let resetFav = async () => {
  try {
    Storage.set('favorites', JSON.stringify([]));
  } catch (err) {
    return err;
  }
};
let deleteFromFav = async (item: any) => {
  try {
    let resp: IAnimeEntry[] = await JSONParser(Storage.getString('favorites'));
    resp = await resp.filter(itm => item.id != itm.id);
    Storage.set('favorites', JSON.stringify(resp));
  } catch (err) {
    return err;
  }
};
let addToFav = async (item: any) => {
  try {
    let exists = false;
    let resp = await JSONParser(Storage.getString('favorites'));
    for await (let items of resp) {
      if (items.id == item.id) {
        exists = true;
        break;
      }
    }
    if (exists) {
      return null;
    }
    let newItem = {
      id: item.id,
      title: item.title,
      url: item.url,
      image: item.image,
    };
    let newList = [...resp, newItem];
    Storage.set('favorites', JSON.stringify(newList));
    // console.log(newList);
    return newList;
  } catch (err) {
    return err;
  }
};

let link =
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4';

export {
  tw,
  colors,
  wp,
  hp,
  addToFav,
  deleteFromFav,
  JSONParser,
  resetFav,
  link,
};
export type {IAnimeEntry, IAnimePage, IEpisode, IAnimeInfo, EpisodeData};
