import qs from "qs";

import { axiosRequest } from "@/utils/base";

const searchAlbum = async function (token, keyword) {
    let url = `${process.env.API_BASE_URL}/search`;
    const config = {
        method: "GET",
        url: `${url}?${qs.stringify({
            q: `album:${keyword}&artist`,
            type: "album,artist",
        })}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);
    if (data.error) return false;
    const artists = data.artists.items
        .filter((item, index) => index < 5)
        .map((item) => {
            return {
                id: item.id,
                name: item.name,
                href: item.href,
                image: item.images.length ? item.images[0].url : "",
            };
        });
    const albums = data.albums.items.map((item) => {
        return {
            id: item.id,
            name: item.name,
            href: item.href,
            image: item.images.length ? item.images[0].url : "",
            artist: item.artists[0].name,
        };
    });
    return { artists, albums };
};

export default searchAlbum;
