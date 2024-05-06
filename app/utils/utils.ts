interface IApiProps {
  page?: number | string;
  id?: number | string;
}

let fetchTop = async ({page}: IApiProps) => {
  let resp = await fetch(
    `https://dezz-consument.vercel.app/anime/gogoanime/top-airing?page=${
      page ? page : 1
    }`,
  ).then(res => res.json());
  //   console.log(resp);
  return resp;
};

let fetchRecentEpisodes = async ({page}: IApiProps) => {
  let resp = await fetch(
    `https://dezz-consument.vercel.app/anime/gogoanime/recent-episodes?page=${
      page ? page : 1
    }`,
  ).then(res => res.json());
  //   console.log(resp);
  return resp;
};
let fetchAnimeInfo = async ({id}: IApiProps) => {
  let resp = await fetch(
    `https://dezz-consument.vercel.app/anime/gogoanime/info/${id}`,
  ).then(res => res.json());

  return resp;
};
let fetchEpisode = async ({id}: {id: string | number}) => {
  let resp = await fetch(
    `https://dezz-consument.vercel.app/anime/gogoanime/watch/${id}?server=gogocdn`,
  ).then(res => res.json());
  return resp;
};

let queryAnime = async ({
  query,
  pid,
}: {
  query: string;
  pid: number | string;
}) => {
  try {
    console.log("tring")
    let resp =
      await fetch(`https://dezz-consument.vercel.app/anime/gogoanime/${query}?page=${pid}
  `).then(res => res.json());
    return resp;
  } catch (err) {
    return err;
  }
};

export {
  fetchTop,
  fetchRecentEpisodes,
  fetchAnimeInfo,
  fetchEpisode,
  queryAnime,
};
