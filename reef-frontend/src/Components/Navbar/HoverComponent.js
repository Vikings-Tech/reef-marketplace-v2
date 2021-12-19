import { useState, useRef, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
// import classNames from "../../../utils/classNames";
// import "../../HomeComponents/HomeBannerNav/style.css";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HoverComponent({ navigator = [
    {
        path: "/highlightreel",
        name: "Highlight Reel",
    },
    {
        path: "/thecuriouspro",
        name: "The Curious Pro",
    },
], title = "Wut" }) {
    const { pathname: path } = useLocation();

    return (
        <div as="div" className="relative inline-block text-left">
            <div
                className="group"
            >
                <div className="hover:text-primary">
                    <div
                        className=
                        {`focus:outline-none  nav-text px-3 py-6 md:py-2 flex items-center text-xl md:text-sm uppercase font-bold leading-snug ${navigator.find(element => (path.indexOf(element.path) > -1 || path.indexOf(element.alter) > -1)) ? "text-primary underline" : "text-white"} cursor-pointer hover:text-primary`}
                    >
                        {title}
                        {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
                    </div>
                </div>

                <div static className="group-hover:block hidden origin-top-right absolute z-50 right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {navigator.map((element => {
                            return (<div>

                                <Link
                                    to={element.path}
                                    className={classNames(
                                        'hover:bg-gray-100 hover:text-gray-900', 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                        path.indexOf(element.path) > -1 ? " underline " : "",
                                    )}
                                >
                                    {element.name}
                                </Link>

                            </div>);
                        }))}
                    </div>
                </div>
            </div>
        </div>
    )
}