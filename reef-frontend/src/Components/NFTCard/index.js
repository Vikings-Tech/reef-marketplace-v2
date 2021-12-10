import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJSONfromHash } from "../../config/axios";

const NFTCard = ({ metaData, metaDataHash, sale }) => {
    const [currentMetaData, setCurrentMetaData] = useState({});
    return (<>
        <div className="glass-2 py-2 text-white">
            <div className="relative h-64 m-4 rounded-md bg-gray-400" style={{ backgroundImage: `url("${currentMetaData?.image?.length > 0 ? `https://ipfs.infura.io/ipfs/${currentMetaData?.image}` : "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" || metaData?.image?.length > 0 ? `https://ipfs.infura.io/ipfs/${metaData?.image}` : metaData?.file instanceof File ? URL.createObjectURL(metaData?.file) : "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"}")`, backgroundSize: "cover" }}>
                {/* <div
                    onClick={() => setLike(!like)}
                    className=" cursor-pointer absolute top-4 right-4 rounded-md h-14 w-14 heart-bg mx-auto flex justify-around items-center">
                     <img src={like ? HeartFilled : HeartEmpty} /> 
            </div> */}
            </div>
            <Link to={`${"sdf"}`} >
                <div className=" w-full truncate  mx-4  font-bold"> {currentMetaData?.title || metaData?.title}</div>
                <div className=" truncate  px-4 text-sm mb-4">@{"Unknown"}</div>
                {(false) &&
                    <div className="flex px-4 pt-8 pb-4 my-4 border-t border-white justify-between items-center">
                        <div>
                            <div className="text-sm mb-1">Price</div>
                            {/* <div className="text-base"><b>{utils.formatEther(price)} ONE</b> $107,83</div> */}
                        </div>

                    </div>
                }

            </Link>
        </div>
    </>)

    return (<div class="w-96  bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ">
        <div>
            <img class="object-center object-cover h-64 w-full" src={currentMetaData?.image?.length > 0 ? `https://ipfs.infura.io/ipfs/${currentMetaData?.image}` : "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" || metaData?.image?.length > 0 ? `https://ipfs.infura.io/ipfs/${metaData?.image}` : metaData?.file instanceof File ? URL.createObjectURL(metaData?.file) : "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"} alt="photo" />
        </div >
        <div class="h-32 text-center py-8 sm:py-6">
            <p class="text-xl text-gray-700 font-bold mb-2">{currentMetaData?.title || metaData?.title}</p>
            <p class="text-base text-gray-400 font-normal">{currentMetaData?.subtitle || metaData?.subtitle}</p>
        </div>
    </div >);
}
export default NFTCard