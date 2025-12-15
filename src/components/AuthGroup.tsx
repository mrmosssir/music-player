import { useState } from "react";

import { login } from "@/utils/auth";

import { useAuth } from "@/hooks/useAuth";

import Logo from "@/components/Logo";
import ProfileMenu from "@/components/ProfileMenu";
import Theme from "@/components/Theme";

import menu from "@/assets/svg/menu.svg";
import triangle from "@/assets/svg/triangle.svg";

import defaultProfile from "@/assets/default_user.png";

export type AuthGroupProps = {
    title: string;
    subTitle?: string;
    icon?: string;
}

const AuthGroup = (props: AuthGroupProps) => {
    const { user } = useAuth();
    const [toggle, setToggle] = useState(false);

    const loginBtn = () => {
        return (
            <button className="flex items-center bg-transparent border border-white/50 px-6" onClick={() => login()}>
                登入
            </button>
        );
    };

    const profileBtn = () => {
        return (
            <button className="flex items-center bg-transparent border border-white/50 px-1 relative" onClick={() => setToggle(!toggle)}>
                <img className="w-8 h-8 rounded-full mr-3" src={user.image ?? defaultProfile} alt={user.name} />
                {user.name}
                <img className="mr-2 ml-3" width="10" height="10" src={triangle} alt="展開" />
                {toggle ? <ProfileMenu /> : ""}
            </button>
        );
    };

    return (
        <div className="flex justify-center items-center relative lg:justify-between">
            <Logo type="mobile" />
            <Theme main={props.title} sub={props.subTitle} icon={props.icon} />
            <div className="hidden items-center lg:flex">
                <button className="text-white h-10 rounded-full tracking-[0.05rem]">Music Premium</button>
                {user?.name ? profileBtn() : loginBtn()}
            </div>
            <div className="flex items-center absolute top-0 right-0 lg:hidden">
                <button className="mx-2">
                    <img src={menu} alt="開啟選單" />
                </button>
            </div>
        </div>
    );
};

export default AuthGroup;
