import { axiosRequest } from "@/utils/base";

export type Image = {
  url: string;
  width: number;
  height: number;
};

export type MusicItem = {
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
  const url = `${import.meta.env.VITE_API_BASE_URL}/browse/categories/toplists/playlists`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ country: country || "TW", limit: "20" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.playlists.items.filter((item: SpotifyPlaylist) => item.name.indexOf("50") >= 0)[3].id || "";
  } catch {
    return "";
  }
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
        name: album.name,
        image: album.images[0]?.url,
        artist: album.artists[0]?.name,
        type: "track",
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
