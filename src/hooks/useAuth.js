import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/hooks";
import { clientToken, adminToken } from "@/utils/auth";
import { info } from "@/utils/user";
import cookie from "@/utils/cookie";
import { setToken, setUser } from "@/store/Auth.model";

export const useAuth = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const user = useSelector((state) => state.auth.user);

    const checkLogin = async function () {
        const cookieToken = cookie.get("token");

        // If token exists, get user info directly
        if (cookieToken) {
            await dispatch(setToken(cookieToken));
            const userData = await info(cookieToken);
            if (userData) {
                dispatch(
                    setUser({
                        country: userData.country,
                        name: userData.display_name,
                        email: userData.email,
                        followers: userData.followers,
                        href: userData.href,
                        id: userData.id,
                        image: userData.images[0]?.url,
                        product: userData.product,
                        type: userData.type,
                        uri: userData.uri,
                    })
                );
            }
            return;
        }

        const code = query.get("code");
        const state = query.get("state");
        
        // If redirect from login page
        if (code) {
            const tokenData = await clientToken(code, state);
            if (tokenData.access_token) {
                cookie.set("token", tokenData.access_token, tokenData.expires_in);
                localStorage.setItem("refresh_token", tokenData.refresh_token);
                location.href = "/music-player/";
                return;
            }
        }

        // If nothing, get admin token
        const adminData = await adminToken();
        if (adminData) dispatch(setToken(adminData));
    };

    useEffect(() => {
        checkLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user };
};
