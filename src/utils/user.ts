import { axiosRequest } from "@/utils/base";

export type UserInfo = {
  country: string;
  name: string;
  email: string;
  followers: number;
  href: string;
  id: string;
  image: string;
  product: string;
  type: string;
  uri: string;
};

export const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/me`;

  const config = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axiosRequest(config);
    return {
      country: data.country,
      name: data.display_name,
      email: data.email,
      followers: data.followers.total,
      href: data.href,
      id: data.id,
      image: data.images[0]?.url || "",
      product: data.product,
      type: data.type,
      uri: data.uri,
    };
  } catch (error) {
    return null;
  }
};
