const axios = require("axios");
const instance = axios.create({
    baseURL: "https://reef-backend.herokuapp.com/v1",
});
export const getHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
            "content-type": "application/json",
        },
    };
};
const getMultipartHeader = () => {
    return {
        headers: {
            pinata_api_key: process.env.REACT_APP_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_API_SECRET, "content-type": "multipart/form-data",
        },
    };
};

export const pinFileToIPFS = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const url = `/pinning/pinFileToIPFS`;
    return instance.post(url, formData, getMultipartHeader())
}
export const createUser = (json) => {
    const url = `/auth/register`;
    return instance.post(url, json, getHeader())

}
export const getUser = (wallet) => {
    const url = `/users/${wallet}`;
    return instance.get(url, getHeader())

}
export const updateUser = (wallet, body) => {
    const url = `/users/${wallet}`;
    return instance.patch(url, body, getHeader())

}
export const unPin = (hash) => {
    const url = `/pinning/unpin/${hash}`;
    return instance.delete(url, getHeader());
}
export const getJSONfromHash = (hash) => {
    return axios.get(`https://ipfs.infura.io/ipfs/${hash}`);
}