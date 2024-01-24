import { useLocation } from "react-router";

export const useQuery = function () {
    return new URLSearchParams(useLocation().search);
}