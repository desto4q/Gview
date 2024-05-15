import axios from 'axios';

interface IApiProps {
  page?: number | string;
  id?: number | string;
}

const fetchTop = async ({ page }: IApiProps) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/top-airing?page=${page ? page : 1}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchRecentEpisodes = async ({ page }: IApiProps) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/recent-episodes?page=${page ? page : 1}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchAnimeInfo = async ({ id }: IApiProps) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/info/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchEpisode = async ({ id }: { id: string | number }) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/watch/${id}?server=gogocdn`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const queryAnime = async ({ query, pid }: { query: string; pid: number | string }) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/${query}?page=${pid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchPopular = async ({ page }: IApiProps) => {
  try {
    const response = await axios.get(`https://dezz-consument.vercel.app/anime/gogoanime/popular?page=${page ? page : 1}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  fetchTop,
  fetchRecentEpisodes,
  fetchAnimeInfo,
  fetchEpisode,
  queryAnime,
  fetchPopular,
};
