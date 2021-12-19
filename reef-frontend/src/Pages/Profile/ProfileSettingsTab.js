import PrimaryWhite from "Components/Buttons/PrimaryButton";
import TextInput from "Components/Inputs/TextInput";
import Heading from "Components/Texts/Heading";
import { useState } from "react";
// import CopyIcon from "assets/copy_icon.svg";
import Checkbox from "Components/Texts/Heading";
import Button2 from "Components/Buttons/Button2/index";
import Profile from "assets/profile.jpeg"

const DataCard = ({ title, desc }) => {
    return (<div className=" mx-4 text-center">
        <div>{title}</div>
        <div className="glass-2 mt-8 px-7 py-9">{desc}</div>
    </div>)
}

const ProfileSettingsTab = ({ }) => {
    const [values, setValues] = useState({
        name: "Oyster User",
        description: "I'm new to Oyster",
        website: "www.mywebsite.com",
        twitter: "mytwitter",
        wallet_address: "1x57fhjfd57fhjfd57fhjfd57fhjfd57fhjfd57fhjfd",
        date: "6/11/12",
        website: "www.mywebsite.com",
        twitter: "@someonelikeme",
        show_earnings: true,
        show_spendings: true,
    })
    const [isEdit, setIsEdit] = useState(false);
    const editValue = (field, value) => {
        let newVal = { ...values };
        newVal[field] = value;
        setValues(newVal);
    }
    return (<div>
        <div className="flex flex-col w-full items-center text-white py-16">
            <div className="blur-glass rounded-full w-40 h-40 top-64 shadow-lg"   >
                <img src={Profile} className=" rounded-full m-2 w-36 h-36 bg-gray-400  " />
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
                    <div className="font-normal pl-2 pr-1">{values.wallet_address}</div>
                    {/* <img src={CopyIcon} /> */}
                </div>
                <div className="flex items-center mb-8">
                    <b>Member Since:</b>
                    <div className="font-normal pl-2 pr-1">{values.date}</div>
                </div>

            </div>

            {isEdit &&
                <Button2
                    onClick={() => setIsEdit(false)}

                >
                    Save Changes
                </Button2>}

        </div>
    </div >);
}
export default ProfileSettingsTab