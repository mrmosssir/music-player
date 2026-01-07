import { useLocation } from "react-router-dom";

export const useRoute = () => {
  const location = useLocation();

  const handeGetQuery = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key) || "";
  };

  return {
    query: {
      get: handeGetQuery,
    },
  };
};
