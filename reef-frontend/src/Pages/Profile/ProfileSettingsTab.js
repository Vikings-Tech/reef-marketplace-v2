import PrimaryWhite from "Components/Buttons/PrimaryButton";
import TextInput from "Components/Inputs/TextInput";
import Heading from "Components/Texts/Heading";
import { useContext, useState, useEffect } from "react";
// import CopyIcon from "assets/copy_icon.svg";
import Checkbox from "Components/Texts/Heading";
import Button2 from "Components/Buttons/Button2/index";
import Profile from "assets/profile.jpeg"
import Web3Context from "Context/Web3Context";
import { Identicon } from '@polkadot/react-identicon';

const DataCard = ({ title, desc }) => {
    return (<div className=" mx-4 text-center">
        <div>{title}</div>
        <div className="glass-2 mt-8 px-7 py-9">{desc}</div>
    </div>)
}

const ProfileSettingsTab = ({ }) => {
    const { account, userDetails, updateUserProfile } = useContext(Web3Context);

    const [values, setValues] = useState({
        ...userDetails
    })
    console.log(values);
    console.log(userDetails);
    useEffect(() => {
        setValues({ ...userDetails });
    }, [userDetails])
    const [isEdit, setIsEdit] = useState(false);
    const editValue = (field, value) => {
        let newVal = { ...values };
        newVal[field] = value;
        setValues(newVal);
    }
    return (<div>
        <div className="flex flex-col w-full items-center text-white py-16">
            <div className="blur-glass rounded-full w-40 h-40 top-64 shadow-lg"   >
                <Identicon
                    size={160}
                    className='bg-gray-400 rounded-full'
                    value={account}
                />
                {/* <img src={Profile} className=" rounded-full m-2 w-36 h-36 bg-gray-400  " /> */}
            </div>
            {!isEdit ?
                <>
                    <Heading className="pt-4">{values.name}</Heading>
                    <div className="py-4 font-normal">{values.description}</div>
                    <Button2
                        onClick={() => setIsEdit(true)}

                    >
                        Edit Details
                    </Button2>

                </> : <div className="px-24 w-full">
                    <TextInput
                        className="font-bold w-full text-3xl mt-4"
                        value={values.name}
                        onChange={(e) => editValue("name", e.target.value)}
                    />
                    <TextInput
                        className="font-normal w-full my-4"
                        value={values.description}
                        onChange={(e) => editValue("description", e.target.value)}
                    />
                </div>}
            <div className="divider" />
            <div className=" my-8 glass-2 max-w-4xl py-16 px-20">
                <div className="flex items-center mb-8">
                    <b>Wallet Address:</b>
                    <div className="font-normal pl-2 pr-1">{values.wallet_id}</div>
                    {/* <img src={CopyIcon} /> */}
                </div>
                <div className="flex items-center mb-8">
                    <b>Member Since:</b>
                    <div className="font-normal pl-2 pr-1">{`${new Date(values.createdAt).getDate()}/${new Date(values.createdAt).getMonth() + 1}/${new Date(values.createdAt).getFullYear()}`}</div>
                </div>

            </div>

            {isEdit &&
                <Button2
                    onClick={() => {
                        updateUserProfile(values)
                        setIsEdit(false)
                    }}

                >
                    Save Changes
                </Button2>}

        </div>
    </div >);
}
export default ProfileSettingsTab