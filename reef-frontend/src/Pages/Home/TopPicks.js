import NewCard from "Components/Cards/NFT/NewCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css"

const TopPicks = ({ }) => {
    const nsettings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        // className: "center",
        // centerMode: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PreviousArrow />,

    }
    return (<>
        <h1 className=" mt-32 w-full items-center text-center text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block text-center xl:inline">Top Picks</span>{' '}
        </h1>
        <div className="my-16 max-w-6xl mx-auto">
            <Slider {...nsettings}>
                <NewCard />
                <NewCard />
                <NewCard />
                <NewCard />
                <NewCard />
                <NewCard />
                <NewCard />
            </Slider>
        </div>

    </>);
}
export default TopPicks