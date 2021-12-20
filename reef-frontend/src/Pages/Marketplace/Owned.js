import { useContext, useEffect, useState } from "react";
import NFTListedCard from "../../Components/Cards/NFT/Listed";
import CollectionCard from "../../Components/CollectionCard";
import Spinner from "../../Components/Loader/Spinner";
import NFTCard from "../../Components/NFTCard";
import NFTForSaleCard from "../../Components/NFTForSaleCard";
import Tabs from "../../Components/Tabs";
import { getJSONfromHash } from "../../config/axios";
import ExplorePageContext from "../../Context/ExplorePageContext";
import Web3Context from "../../Context/Web3Context";


const OwnedCollections = () => {
    const { selectedNFTtoBuy, setSelectedNFTtoBuy } = useContext(ExplorePageContext);
    const { fetchMarketItems, fetchMyNFTs, fetchItemsCreated, startBidListening } = useContext(Web3Context);
    const [allCollections, setAllCollections] = useState(undefined);
    const [myItemsListed, setMyItemsListed] = useState(undefined);
    const [myOwnedItems, setMyOwnedItems] = useState(undefined);
    useEffect(() => {
        startBidListening();
        const fetch = async () => {
            const result = await fetchMarketItems()
            const collectionsArray = result[0];
            const auctionArray = result[1];
            const allCollectionsData = collectionsArray.map((e, index) => ({ collection: e, auction: auctionArray[index] }));

            // setAllCollections(allCollectionsData);
            // setMyItemsListed(await fetchItemsCreated());
            setMyOwnedItems(await fetchMyNFTs());
            setSelectedNFTtoBuy({});
        }
        fetch();

    }, [])

    return (<>
        <div className="container mx-auto px-2 lg:px-4 mt-4 mb-16">
            <div className="my-8 font-otoman text-4xl font-bold w-full text-white text-center">Owned Items</div>

            {!myOwnedItems ? <Spinner /> :
                <div className="grid grid-cols-3 gap-4">
                    {myOwnedItems.map((collection) => {
                        return (<NFTForSaleCard {...collection} />);
                    })}
                </div>

            }


        </div>

    </>)
}
export default OwnedCollections;