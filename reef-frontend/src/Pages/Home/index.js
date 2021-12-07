import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import Particles from "react-tsparticles";

import CoralRock from "assets/HomePage/coral_rock.png";
import CoralRock2 from "assets/HomePage/coral_rock_2.png";
import Fishes from "assets/HomePage/fishes.png";
import JellyFish from "assets/HomePage/jellyfish.png";
import Navbar from "Components/Navbar/index";
import TopPicks from "./TopPicks";
const Home = () => {


    return (<main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <span className="block xl:inline">Your one stop to Create and Sell</span>{' '}
                    <span className="block text-primary xl:inline">NFTs</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                    The coolest NFT Marketplace on Reef Chain ;)
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                        <Link
                            to="/createCollection"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary md:py-4 md:text-lg md:px-10"
                        >
                            Create
                        </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <Link
                            to="/explore"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF0066" d="M51.6,-57.5C61.9,-41.3,61.9,-20.6,56.2,-5.7C50.5,9.2,39.1,18.5,28.8,29.6C18.5,40.8,9.2,53.8,-1.4,55.2C-12.1,56.6,-24.1,46.4,-37.5,35.3C-50.8,24.1,-65.4,12.1,-62.5,2.9C-59.6,-6.2,-39.1,-12.4,-25.7,-28.6C-12.4,-44.9,-6.2,-71.1,7.2,-78.4C20.6,-85.6,41.3,-73.7,51.6,-57.5Z" transform="translate(100 100)" />
            </svg>
        </div>
    </main>);
}


const NewHome = () => {
    const particlesInit = (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (<>

        <div className="relative" style={{ height: "100vh", width: "100vw" }}>
            {/* <Navbar /> */}
            <img src={CoralRock2} alt="Coral Rock" className="w-full z-0 left-animate absolute bottom-0 left-0" />
            {/* <img src={Fishes} alt="Coral Rock" className="h-full absolute top-0 left-0" /> */}
            <img src={JellyFish} alt="Coral Rock" className="h-36 absolute top-24 right-52 jellyfish-animate" />

            <img src={CoralRock} alt="Coral Rock" className="h-full z-0 right-animate absolute bottom-0 right-0" />

            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center left-animate lg:py-48 lg:text-left">
                <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline  z-40">Your one stop to Create and Sell</span>{' '}
                        <span className="block text-primary xl:inline z-40">NFTs</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg  z-40 text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                        The coolest NFT Marketplace on Reef Chain ;)
                    </p>
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <Link
                                to="/createCollection"
                                className=" z-40 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary md:py-4 md:text-lg md:px-10"
                            >
                                Create
                            </Link>
                        </div>
                        <div className=" z-40 mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <Link
                                to="/explore"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <Particles id="tsparticles"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{

                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: false,
                    },
                    modes: {
                        bubble: {
                            distance: 400,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                        },
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outMode: "out",
                        random: false,
                        speed: 1,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                        value: 14,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: true,
                        value: 5,
                    },
                },
                detectRetina: true,
            }}
            init={particlesInit} loaded={particlesLoaded} />
        <TopPicks />

    </>)
}
export default NewHome;