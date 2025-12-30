import { axiosRequest } from "@/utils/base";

export type Image = {
  url: string;
  width: number;
  height: number;
};

export type MusicItem = {
  id: string;
  name: string;
  artist: string;
  image: string;
  type: string;
  url?: string;
  method?: () => Promise<File>;
};

export type MusicTrack = {
  name: string;
  duration: number;
  id: string;
  artist: string;
  image: string;
  url: string;
};

export type UserPlaylistItem = {
  id: string;
  image: string;
  name: string;
  total: number;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyAlbum = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: Image[];
  external_urls: { spotify: string };
};

type SpotifyPlaylist = {
  id: string;
  name: string;
  owner: { display_name: string };
  images: Image[];
  tracks: { total: number };
  external_urls: { spotify: string };
};

type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
};

type SpotifyPlaylistTrackItem = {
  track: SpotifyTrack;
};

const getImage = (images: Image[]) => {
  if (!images || !images.length) return "";
  const largest = images.reduce((prev, current) => {
    return prev.width * prev.height > current.width * current.height ? prev : current;
  });
  return largest.url ?? "";
};

export const getNewRelease = async (token: string, country: string): Promise<MusicItem[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/browse/new-releases`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ country: country || "TW", limit: "8" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);

    return data.albums.items.map((item: SpotifyAlbum) => {
      return {
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        image: getImage(item.images),
        type: "album",
        url: item.external_urls.spotify,
      };
    });
  } catch {
    return [];
  }
};

export const getFeaturedPlaylist = async (token: string, country: string): Promise<MusicItem[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/search`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ q: "featured", type: "playlist", limit: "8", market: country || "TW" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.playlists.items
      .filter((item: SpotifyPlaylist | null) => !!item)
      .map((item: SpotifyPlaylist) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.owner.display_name,
          image: getImage(item.images),
          type: "playlist",
          url: item.external_urls.spotify,
        };
      });
  } catch {
    return [];
  }
};

export const getTopPlaylistId = async (token: string, country: string): Promise<string> => {
  // 技巧：直接搜尋 "Filtr Global" 或 "Filtr Hits"
  // 這樣可以找到 Filtr 品牌維護的熱門歌單
  const query = "Billboard Hot 100";
  const url = `${import.meta.env.VITE_API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`;

  const config = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data } = await axiosRequest(config);

  // 雖然搜尋結果通常很準，但為了保險，我們可以過濾一下
  // 確保擁有者名稱包含 'Filtr' (大小寫不拘)
  const playlist = data.playlists.items.filter((item: SpotifyPlaylist) => !!item && item.owner.display_name?.toLowerCase().includes("billboard"));

  return playlist.length ? playlist[0].id : "";
};

export const getTopPlaylist = async (token: string, id: string): Promise<MusicItem[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/playlists/${id}`;

  const config = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.tracks.items.map((item: SpotifyPlaylistTrackItem) => {
      const album = item.track?.album;
      return {
        id: item.track.id,
        name: album.name,
        image: album.images[0]?.url,
        artist: album.artists[0]?.name,
        type: "track",
        url: album.external_urls.spotify,
      };
    });
  } catch {
    return [];
  }
};

export const getUserPlaylist = async (token: string, userId: string): Promise<UserPlaylistItem[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/playlists`;

  const config = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.items.map((item: SpotifyPlaylist) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
      total: item.tracks.total,
    }));
  } catch {
    return [];
  }
};

export const getPlaylistTracks = async (token: string, id: string): Promise<MusicTrack[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/playlists/${id}`;

  const config = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.tracks.items.map((item: SpotifyPlaylistTrackItem) => ({
      name: item.track.name,
      duration: item.track.duration_ms,
      id: item.track.id,
      artist: item.track.artists[0].name,
      image: item.track.album.images[0].url,
    }));
  } catch {
    return [];
  }
};

export const getTrackInfo = async (token: string, id: string): Promise<MusicTrack> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/tracks/${id}`;

  const config = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return {
      name: data.name,
      duration: data.duration_ms,
      id: data.id,
      artist: data.artists[0].name,
      image: data.album.images[0].url,
      url: data.album.external_urls.spotify,
    };
  } catch {
    return {} as MusicTrack;
  }
};
