import { axiosRequest } from "@/utils/base";

const info = async function (token) {
    const url = `${process.env.API_BASE_URL}/me`;
    const config = {
        method: "GET",
        url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axiosRequest(config);
    return data;
};

export { info };
