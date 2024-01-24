import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@/hooks";

import { login, adminToken, clientToken } from "@/utils/auth";
import { info } from "@/utils/user";
import cookie from "@/utils/cookie";

import { setToken, setUser } from "@/store/Auth.model";

import style from "@/components/AuthGroup.module.css";

import Logo from "@/components/Logo";
import ProfileMenu from "@/components/ProfileMenu";
import Theme from "@/components/Theme";

import menu from "@/assets/svg/menu.svg";
import search from "@/assets/svg/search.svg";
import triangle from "@/assets/svg/triangle.svg";

import defaultProfile from "@/assets/default_user.png";

const AuthGroup = function (props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [toggle, setToggle] = useState(false);
    
    const query = useQuery();

    const checkLogin = async function () {

        const cookieToken = cookie.get("token");

        // 有 token 就直接取得用戶資料
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
        
        // 如果是從登入頁過來
        if (code) {
            const tokenData = await clientToken(code, state);
            if (tokenData.access_token) {
                cookie.set("token", tokenData.access_token, tokenData.expires_in);
                localStorage.setItem("refresh_token", tokenData.refresh_token);
                location.href = "/music-player/";
                return;
            }
        }

        // 都沒有就取得 admin token
        const adminData = await adminToken();
        if (adminData) dispatch(setToken(adminData));
    };

    const loginBtn = function () {
        return (
            <button className={style.login} onClick={() => login()}>
                登入
            </button>
        );
    };

    const profileBtn = function () {
        return (
            <button className={style.user} onClick={() => setToggle(!toggle)}>
                <img
                    className={style.profile}
                    src={user.image ?? defaultProfile}
                    alt={user.name}
                />
                {user.name}
                <img
                    className={style.open}
                    width="10"
                    height="10"
                    src={triangle}
                    alt="展開"
                />
                {toggle ? <ProfileMenu /> : ""}
            </button>
        );
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <div className={style.frame}>
            <Logo type="mobile" />
            <Theme main={props.title} sub={props.subTitle} icon={props.icon} />
            <div className={style.auth}>
                <button className={style.upgrade}>Music Premium</button>
                {user?.name ? profileBtn() : loginBtn()}
            </div>
            <div className={style.feature}>
                <button>
                    <img src={menu} alt="開啟選單" />
                </button>
            </div>
        </div>
    );
};

export default AuthGroup;
