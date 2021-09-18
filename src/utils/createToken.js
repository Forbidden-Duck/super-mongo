const cryptojs = require("crypto-js");

/**
 * Create a random token
 * @param {"SHA1" | "SHA224" | "SHA256" | "SHA3" | "SHA384" | "SHA512"} [sha=] SHA256 is default
 * @param {string} str
 * @returns {string}
 */
module.exports.create = (sha = "SHA256", str) => {
    if (
        !["SHA1", "SHA224", "SHA256", "SHA3", "SHA384", "SHA512"].includes(sha)
    ) {
        throw new TypeError("Invalid SHA method");
    } else if (typeof str !== "string") {
        throw new TypeError("str is not a string");
    }
    const random = (
        Math.floor(Math.random() * 999999999) + new Date().getTime()
    ).toString();
    return cryptojs[sha](random + str).toString();
};
