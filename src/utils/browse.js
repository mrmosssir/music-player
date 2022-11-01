import axios from "axios";
import qs from "qs";
import { adminToken, login } from './auth';

const getNewRelease = async function (token, country) {
  let url = `${process.env.API_BASE_URL}/browse/new-releases`;
  const config = {
    method: "GET",
    url: `${url}?${qs.stringify({ country: country, limit: 8 })}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const { data } = await axios(config);
  if (data.error) return false;
  return data.albums.items.map((item) => {
    let image = "";
    if (!item.images) image = "";
    else if (item.images.length > 1) image = item.images[1].url ?? "";
    else if (item.images.length > 0) image = item.images[0].url ?? "";
    return {
      id: item.id,
      type: item.album_type,
      name: item.name,
      artists: item.artists[0].name,
      image
    };
  })
}

const getFeaturedPlayList = async function (token, country) {
  const url = `${process.env.API_BASE_URL}/browse/featured-playlists`;
  const config = {
    method: "GET",
    url: `${url}?${qs.stringify({ country: country, limit: 8 })}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  try {
    const { data } = await axios(config);
    if (data.error) return false;
    return data.playlists.items.map((item) => {
      let image = "";
      if (!item.images) image = "";
      else if (item.images.length > 1) image = item.images[1].url ?? "";
      else if (item.images.length > 0) image = item.images[0].url ?? "";
      return {
        id: item.id,
        type: item.album_type,
        name: item.name,
        artists: item.owner.display_name,
        image,
        status: 0
      };
    })
  } catch (error) {
    if (error.response.status === 401) {
      const admin = await adminToken();
      return { token: admin, status: 401 }
    }
  }
}

const getTopPlayListId = async function (token, country) {
  const url = `${process.env.API_BASE_URL}/browse/categories/toplists/playlists`;
  const config = {
    method: "GET",
    url: `${url}?${qs.stringify({ country: country, limit: 20 })}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const { data } = await axios(config);
  if (data.error) return false;
  const id = data.playlists.items.filter(item => item.name.indexOf("50") >= 0)[3].id;
  return id;
}

const getTopPlayList = async function (token, id) {
  const url = `${process.env.API_BASE_URL}/playlists/${id}`;
  const config = {
    method: "GET",
    url: url,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const { data } = await axios(config);
  if (data.error) return false;
  const list = data.tracks.items;
  return list.map((item, index) => {
    const album = item.track?.album;
    return {
      key: `${album.id}${index}`,
      id: album.id,
      name: album.name,
      image: album.images[0]?.url,
      artist: album.artists[0]?.name
    }
  });
}

const browse = {
  getNewRelease,
  getFeaturedPlayList,
  getTopPlayList,
  getTopPlayListId
};

export default browse;