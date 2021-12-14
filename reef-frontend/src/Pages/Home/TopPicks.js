import NewCard from "Components/Cards/NFT/NewCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css"

const TopPicks = ({ title }) => {
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
    return (<div data-aos="fade-up">
        <h1 ao className=" my-32 w-full items-center text-center text-4xl tracking-tight font-bold text-gray-900 ">
            <span className="block font-otoman text-white   xl:inline">{title}</span>{' '}
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

    </div>);
}
export default TopPicks