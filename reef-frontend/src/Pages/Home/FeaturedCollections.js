import NewCard from "Components/Cards/NFT/NewCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css"
import CollectionCard from "Components/CollectionCard/index";

const FeaturedCollections = ({ title }) => {
    const nsettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        rows: 2,

    }
    return (<>
        <h1 className=" my-32 w-full items-center text-center text-4xl tracking-tight font-bold text-gray-900 ">
            <span className="block font-otoman text-white   xl:inline">{title}</span>{' '}
        </h1>
        <div className="my-16 max-w-7xl mx-auto">
            <Slider {...nsettings}>
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard /> <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />




            </Slider>
        </div>

    </>);
}
export default FeaturedCollections