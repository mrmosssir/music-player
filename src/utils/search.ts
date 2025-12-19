import { axiosRequest } from "@/utils/base";

export type SearchArtist = {
  id: string;
  name: string;
  href: string;
  image: string;
};

export type SearchAlbum = {
  id: string;
  name: string;
  href: string;
  image: string;
  artist: string;
};

export type SearchData = {
  artists: SearchArtist[];
  albums: SearchAlbum[];
};

type SpotifyImage = {
  url: string;
};

type SpotifyArtistItem = {
  id: string;
  name: string;
  href: string;
  images: SpotifyImage[];
};

type SpotifyAlbumItem = {
  id: string;
  name: string;
  href: string;
  images: SpotifyImage[];
  artists: { name: string }[];
};

export const searchAlbum = async (token: string, keyword: string): Promise<SearchData | null> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/search`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ q: `album:${keyword}&artist`, type: "album,artist" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);

    const artists = data.artists.items
      .filter((_item: SpotifyArtistItem, index: number) => index < 5)
      .map((item: SpotifyArtistItem) => ({
        id: item.id,
        name: item.name,
        href: item.href,
        image: item.images.length ? item.images[0].url : "",
      }));

    const albums = data.albums.items.map((item: SpotifyAlbumItem) => ({
      id: item.id,
      name: item.name,
      href: item.href,
      image: item.images.length ? item.images[0].url : "",
      artist: item.artists[0].name,
    }));

    return { artists, albums };
  } catch {
    return null;
  }
};
