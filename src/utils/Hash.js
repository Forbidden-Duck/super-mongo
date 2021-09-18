const cryptojs = require("crypto-js");

// Recreate cryptojs typings as they are not exported for easy use :/

/**
 * @typedef {object} HasherStatic
 * @property {(cfg?: object) => typeof cryptojs.lib.Hasher} create
 */

/**
 * @typedef {object} KDFOption
 * @property {number} [keySize=]
 * @property {HasherStatic} [hasher=]
 * @property {number} [iterations=]
 */

/**
 * Create a new Salt+Hash
 * @param {string} str
 * @param {KDFOption} cfg
 * @returns {string}
 */
module.exports.create = (str, cfg) => {
    cfg.keySize = cfg.keySize || 512 / 32;
    const byteSize = (cfg.keySize * 32) / 2;
    const salt = cryptojs.lib.WordArray.random(byteSize / 2).toString();
    const hash = cryptojs.PBKDF2(str, salt, cfg);
    return salt + hash.toString();
};

/**
 * Compare a hash salt
 * @param {string} str
 * @param {string} salthash
 * @param {KDFOption} cfg
 * @returns {boolean}
 */
module.exports.compare = (str, salthash, cfg) => {
    cfg.keySize = cfg.keySize || 512 / 32;
    const byteSize = (cfg.keySize * 32) / 2;
    const salt = salthash.substring(0, byteSize);
    const hash = salthash.substring(byteSize);
    return hash === cryptojs.PBKDF2(str, salt, cfg).toString();
};
