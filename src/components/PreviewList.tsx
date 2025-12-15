import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import { Link } from "react-router-dom";

import { type MusicItem } from "@/utils/browse";

export type PreviewListProps = {
    title: string;
    link: string;
    list: MusicItem[];
}

const PreviewList = function (props: PreviewListProps) {
    const previewListCols = useSelector(
        (state: RootState) => state.display.previewListCols
    );

    const ref = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState("100%");

    const sizeChange = (column: number) => {
        const device = {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
        };
        const width = ref.current?.offsetWidth;
        const innerWidth = window.innerWidth;
        const gutter = 2; // percents
        let size = 100;

        if (innerWidth > device.lg && width) {
            size = ((width / 100) * (100 - gutter * (column - 1))) / column;
        }

        setSize(`${size}px`);
    };

    useEffect(() => {
        if (!ref.current) return;

        ref.current.classList.add("opacity-0");

        setTimeout(() => {
            sizeChange(previewListCols);
        }, 400);

        setTimeout(() => {
            ref.current?.classList.remove("opacity-0");
        }, 500);

    }, [previewListCols]);

    return (
        <div ref={ref} className="mt-8 opacity-100 transition duration-300">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl text-white">{props.title}</h3>
                <Link to={props.link} className="text-sm text-secondary">更多</Link>
            </div>
            <ul className="w-full block mt-3 whitespace-nowrap overflow-x-scroll lg:flex lg:justify-between lg:items-center">
                {
                    props.list.filter((item, index) => index < previewListCols).map((item, index) => {
                        return (
                            <li className="inline-block mr-4 lg:mr-0" style={{ width: size }} key={index}>
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                <p className="text-sm text-white truncate mt-2 whitespace-nowrap">{item.name}</p>
                                <small className="text-xs text-white-500 truncate mt-2 whitespace-nowrap">{item.artist}</small>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default PreviewList;
