import axios from "axios";
import qs from "qs";

const getNewRealse = async function (token, country) {
  let url = `${process.env.API_BASE_URL}/browse/new-releases`;
  console.log(country);
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
  let url = `${process.env.API_BASE_URL}/browse/featured-playlists`;
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
      image
    };
  })
}

const browse = { getNewRealse, getFeaturedPlayList };

export default browse;