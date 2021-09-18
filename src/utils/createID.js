const cryptojs = require("crypto-js");

/**
 * Create a random ID
 * @param {"SHA1" | "SHA224" | "SHA256" | "SHA3" | "SHA384" | "SHA512"} [sha=] SHA256 is default
 * @returns {string}
 */
module.exports.create = (sha = "SHA256") => {
    if (
        !["SHA1", "SHA224", "SHA256", "SHA3", "SHA384", "SHA512"].includes(sha)
    ) {
        throw new TypeError("Invalid SHA method");
    }
    return cryptojs[sha](str).toString();
};
