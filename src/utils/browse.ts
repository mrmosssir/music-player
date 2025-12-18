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
};

export type MusicTrack = {
  name: string;
  duration: number;
  id: string;
  artist: string;
  image: string;
};

export type UserPlaylistItem = {
  id: string;
  image: string;
  name: string;
  total: number;
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
    url: `${url}?${new URLSearchParams({ country: country, limit: "8" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);

    return data.albums.items.map((item: any) => {
      return {
        name: item.name,
        artist: item.artists[0].name,
        image: getImage(item.images),
      };
    });
  } catch (error) {
    return [];
  }
};

export const getFeaturedPlaylist = async (token: string, country: string): Promise<MusicItem[]> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/search`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ q: "featured", type: "playlist", limit: "8", market: country }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.playlists.items
      .filter((item: any) => !!item)
      .map((item: any) => {
        return {
          name: item.name,
          artist: item.owner.display_name,
          image: getImage(item.images),
        };
      });
  } catch (error) {
    return [];
  }
};

export const getTopPlaylistId = async (token: string, country: string): Promise<string> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/browse/categories/toplists/playlists`;

  const config = {
    method: "GET",
    url: `${url}?${new URLSearchParams({ country: country, limit: "20" }).toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return data.playlists.items.filter((item: any) => item.name.indexOf("50") >= 0)[3].id || "";
  } catch (error) {
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
    return data.tracks.items.map((item: any) => {
      const album = item.track?.album;
      return {
        name: album.name,
        image: album.images[0]?.url,
        artist: album.artists[0]?.name,
      };
    });
  } catch (error) {
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
    return data.items.map((item: any) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
      total: item.tracks.total,
    }));
  } catch (error) {
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
    return data.tracks.items.map((item: any) => ({
      name: item.track.name,
      duration: item.track.duration_ms,
      id: item.track.id,
      artist: item.track.artists[0].name,
      image: item.track.album.images[0].url,
    }));
  } catch (error) {
    return [];
  }
};
