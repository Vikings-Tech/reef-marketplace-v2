import { useContext, useState, useEffect } from "react";
import Web3Context, { Web3Provider } from "../../Context/Web3Context";
import { Link } from "react-router-dom";
const Navbar = () => {
    let listener = null
    const [scrollState, setScrollState] = useState("top")
    useEffect(() => {
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop
            if (scrolled >= 120) {
                if (scrollState !== "amir") {
                    setScrollState("amir")
                }
            } else {
                if (scrollState !== "top") {
                    setScrollState("top")
                }
            }
        })
        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, [scrollState])
    const { account, extensionSetup } = useContext(Web3Context);
    return (<nav
        class={`top-0 z-50 sticky flex items-center justify-between flex-wrap ${scrollState === "top" ? "bg-transparent" : "bg-blue-600"} py-4 lg:px-12`}>
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div class="flex items-center flex-shrink-0 text-gray-800 mr-4">
                <Link to="/" class="font-semibold text-xl tracking-tight">Reef Marketplace</Link>
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
            <Link to="/myCollections"
                class="block mt-4 lg:inline-block lg:mt-0 text-primary px-4 py-2 rounded  mr-2">
                Collections
            </Link>
            <Link to="/explore"
                class=" block mt-4 lg:inline-block lg:mt-0 text-primary px-4 py-2 rounded  mr-2">
                Explore
            </Link>

        </div>

        <div class="menu lg:flex lg:items-center  lg:px-3 px-8">



            <button
                onClick={() => { extensionSetup() }}
                class="block w-48 truncate text-md px-4 py-2 rounded text-white ml-2 font-bold hover:text-white mt-4 hover:bg-red-800 bg-primary lg:mt-0">{account ? account?.toString() : "Connect To Wallet"}</button>


        </div>

    </nav >);
}
export default Navbar;