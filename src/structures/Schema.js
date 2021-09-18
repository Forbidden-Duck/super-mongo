const datatypes = require("../datatypes");

/**
 * Converts an object into a schema
 * @template {string} K
 * @template {datatypes.JSArray | datatypes.BSONRegExp | datatypes.BSONSymbol
 * | datatypes.BSONBinary | datatypes.BSONBinary | datatypes.JSBoolean | datatypes.BSONCode
 * | datatypes.JSDate | datatypes.BSONDecimal128 | datatypes.BSONDouble | datatypes.BSONInt32
 * | datatypes.JSInt64 | datatypes.BSONLong | datatypes.BSONMaxKey | datatypes.BSONMinKey | null
 * | datatypes.JSObject | datatypes.BSONObjectID | datatypes.JSString | datatypes.BSONTimestamp
 * | undefined} V
 * @template {Object<K, V>} S
 */
class Schema {
    /**
     *
     * @param {S} obj
     */
    constructor(obj) {
        /**
         * @private
         * @type {S}
         */
        this._props = {};
        for (const [key, value] of Object.entries(obj)) {
            this._setProp(key, value);
        }
    }

    /**
     * @returns {S}
     */
    get props() {
        return { ...this._props };
    }

    /**
     * @template {keyof S} T
     * @param {T} key
     * @returns {S[T]}
     */
    getProp(key) {
        return this._props[key];
    }

    /**
     * Set the type under the key
     * @private
     * @param {K} key
     * @param {V} type
     */
    _setProp(key, type) {
        if (this.validType(type)) {
            this._props[key] = type;
        } else {
            throw new TypeError("Provided type isn't valid");
        }
    }

    /**
     * Validate the type
     * @param {V} type
     * @returns {boolean}
     */
    validType(type) {
        for (const datatype of Object.values(datatypes)) {
            if (
                type instanceof datatype ||
                type === null ||
                type === undefined
            ) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Schema;
