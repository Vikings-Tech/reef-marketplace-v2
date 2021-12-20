import { useContext, useState, useEffect } from "react";
import Web3Context, { Web3Provider } from "../../Context/Web3Context";
import { Link } from "react-router-dom";
import HoverComponent from "./HoverComponent";
import Logo from "assets/oyester_logo.svg";
import Button2 from "Components/Buttons/Button2/index";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import Profile from "assets/profile.jpeg"
import { Identicon } from '@polkadot/react-identicon';
import getEvmAddress from "utils/evm-address";

import "./style.css"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
    let listener = null
    const [scrollState, setScrollState] = useState("top")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop
            if (window.pageYOffset > 10) {
                setScrollState("amir")

            }
            else {
                setScrollState("top")

            }

        })
        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, [scrollState])
    const { account, extensionSetup, userDetails, signOut, checkSigner } = useContext(Web3Context);
    useEffect(() => {
        checkSigner();
        setLoading(false);
    }, [account])
    return (<nav
        class={`top-0 z-50 sticky flex items-center justify-between flex-wrap ${scrollState === "top" ? "bg-transparent" : "nav-color"} py-4 lg:px-12`}>
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div class="flex items-center flex-shrink-0 text-white mr-4">
                <Link to="/" class="flex font-otoman items-center font-semibold text-xl tracking-tight">
                    <img className="h-12 w-12 mr-2" src={Logo} />
                    <div>Oyster</div>
                </Link>
            </div>

            <div class="block lg:hidden ">
                <button
                    id="nav"
                    class="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="text-md font-bold items-center  text-blue-700 ">
            <HoverComponent
                title="Collections"
                navigator={[
                    { name: "My Collections", path: "/collections/me" },
                    { name: "Explore Collections", path: "/collections/explore" },
                ]}
            />
            <HoverComponent
                title="NFTs"
                navigator={[
                    { name: "Marketplace", path: "/nfts/marketplace" },
                    { name: "Listed", path: "/nfts/listed" },
                    { name: "Owned", path: "/nfts/owned" },
                ]}
            />
            {account && <HoverComponent
                title="Create"
                navigator={[
                    { name: "Collection", path: "/createCollection" },
                    { name: "NFT", path: `/0x73F4a321e7850D80E90AEf8302255E1216Ce280f/listed/${getEvmAddress(account)}/mint` },
                ]}
            />}


        </div>

        <div class="menu lg:flex lg:items-center  lg:px-3 px-8">
            {account &&
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="bg-primary text-white p-2 items-center rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <div className="bg-white rounded-full" style={{ width: "44px", height: "44px", padding: "1px" }}>
                                <Identicon
                                    size={42}
                                    className=' rounded-full'
                                    value={account}
                                />
                            </div>

                            <div className="ml-2  text-lg">
                                {`${userDetails?.name} (${account?.toString()?.slice(0, 4)}....${account?.toString()?.slice(-3)})`}
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/profile"
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        Your Profile
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => signOut()}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        Sign out
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            }
            {!account &&

                <Button2
                    onClick={() => {
                        setLoading(true);
                        extensionSetup()
                    }}
                    className={` ${loading && "h-12 relative loading"}`}

                >
                    <div className="spinner" />

                    {loading ? " " : (account ? account?.toString() : "Connect To Wallet")}
                </Button2>
            }

        </div>

    </nav >);
}
export default Navbar;