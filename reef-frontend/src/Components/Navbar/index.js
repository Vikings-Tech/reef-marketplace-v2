import { useContext, useState, useEffect } from "react";
import Web3Context, { Web3Provider } from "../../Context/Web3Context";
import { Link } from "react-router-dom";
import HoverComponent from "./HoverComponent";
import Logo from "assets/oyester_logo.svg";
import Button2 from "Components/Buttons/Button2/index";
const Navbar = () => {
    let listener = null
    const [scrollState, setScrollState] = useState("top")
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
    const { account, extensionSetup } = useContext(Web3Context);
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


        </div>

        <div class="menu lg:flex lg:items-center  lg:px-3 px-8">


            <Button2
                onClick={() => { extensionSetup() }}

            >
                {account ? account?.toString() : "Connect To Wallet"}
            </Button2>

        </div>

    </nav >);
}
export default Navbar;