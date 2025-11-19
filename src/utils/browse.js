import qs from "qs";

import { adminToken } from "@/utils/auth";
import { axiosRequest } from "@/utils/base";

const getImage = (images) => {
    if (!images || !images.length) return "";
    // Spotify usually returns images sorted by size (largest first), but we can sort to be sure
    const largest = images.reduce((prev, current) => {
        return (prev.width * prev.height) > (current.width * current.height) ? prev : current;
    });
    return largest.url ?? "";
};

const getNewRelease = async function (token, country) {
    let url = `${process.env.API_BASE_URL}/browse/new-releases`;
    const config = {
        method: "GET",
        url: `${url}?${qs.stringify({ country: country, limit: 8 })}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);
    if (data.error) return false;
    return data.albums.items.map((item) => {
        const image = getImage(item.images);
        return {
            id: item.id,
            type: item.album_type,
            name: item.name,
            artists: item.artists[0].name,
            image,
        };
    });
};

const getFeaturedPlayList = async function (token, country) {
    // Use Search API as a fallback for deprecated featured-playlists endpoint
    const url = `${process.env.API_BASE_URL}/search`;
    const config = {
        method: "GET",
        url: `${url}?${qs.stringify({ 
            q: "featured", 
            type: "playlist", 
            limit: 8, 
            market: country 
        })}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    try {
        const { data } = await axiosRequest(config);
        if (data.error) return false;
        return data.playlists.items.filter(item => !!item).map((item) => {
            const image = getImage(item.images);
            return {
                id: item.id,
                type: item.type,
                name: item.name,
                artists: item.owner.display_name,
                image,
                status: 0,
            };
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const admin = await adminToken();
            return { token: admin, status: 401 };
        }
        console.error("Error fetching featured playlists:", error);
        return [];
    }
};

const getTopPlayListId = async function (token, country) {
    const url = `${process.env.API_BASE_URL}/browse/categories/toplists/playlists`;
    const config = {
        method: "GET",
        url: `${url}?${qs.stringify({ country: country, limit: 20 })}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);
    if (data.error) return false;
    const id = data.playlists.items.filter(
        (item) => item.name.indexOf("50") >= 0
    )[3].id;
    return id;
};

const getTopPlayList = async function (token, id) {
    const url = `${process.env.API_BASE_URL}/playlists/${id}`;
    const config = {
        method: "GET",
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);
    if (data.error) return false;
    const list = data.tracks.items;
    return list.map((item, index) => {
        const album = item.track?.album;
        return {
            key: `${album.id}${index}`,
            id: album.id,
            name: album.name,
            image: album.images[0]?.url,
            artist: album.artists[0]?.name,
        };
    });
};

const getUserPlayList = async function (token, userId) {
    const url = `${process.env.API_BASE_URL}/users/${userId}/playlists`;
    const config = {
        method: "GET",
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);

    if (data.error) return;

    const list = data.items.map(item => {
        return {
            id: item.id,
            image: item.images[0].url,
            name: item.name,
            total: item.tracks.total
        }
    });

    return list;
}

const getPlayListTracks = async function (token, id) {
    const url = `${process.env.API_BASE_URL}/playlists/${id}`;
    const config = {
        method: "GET",
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const { data } = await axiosRequest(config);

    if (data.error) return;
    return data.tracks.items;
}

const browse = {
    getNewRelease,
    getFeaturedPlayList,
    getTopPlayList,
    getTopPlayListId,
    getUserPlayList,
    getPlayListTracks
};

export default browse;
