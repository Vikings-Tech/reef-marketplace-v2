
module.exports = (address) => {
    const crypto = require('@polkadot/util-crypto');
    return `0x${crypto.blake2AsHex(crypto.decodeAddress(address), 256).substring(26)}`;
};