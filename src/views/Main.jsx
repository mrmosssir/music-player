import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import browse from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

import { setMainRef } from "@/store/Display.model";

const Main = function (props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const ref = useRef(null);

    const [newList, setNewList] = useState([]);
    const [featuredList, setFeatureList] = useState([]);

    useEffect(() => {
        if (!token) return;
        if (cookie.get("login") && !user) return;
        browse
            .getNewRelease(token, user?.country)
            .then((response) => setNewList(response));
        browse
            .getFeaturedPlayList(
                token,
                user?.country
            )
            .then((response) => setFeatureList(response));
    }, [token, user]);

    useEffect(() => {
        dispatch(setMainRef(ref));
    }, [ref]);

    return (
        <div className="container">
            <AuthGroup title="每日精選" subTitle="Daily Featured" />
            <Banner
                image={newList[0]?.image}
                name={newList[0]?.name}
                artist={newList[0]?.artists}
            />
            <PreviewList
                title="最新專輯"
                list={newList.filter((item, index) => index > 0)}
                link="/"
            />
            <PreviewList title="推薦歌單" list={featuredList} link="/" />
        </div>
    );
};

export default Main;
