const MongoDB = require("mongodb");
const { Obj2Schema } = require("../utils");

/**
 * @typedef {object} SchemaOptions
 * @property {boolean} [noUndefined]
 * @property {boolean} [noNull]
 * @property {boolean} [keepType] Does not replace invalid types with undefined
 * @property {object} [strictMode]
 * @property {boolean} [strictMode.strictType] Throw error when data is of incorrect type (exc. null & undefined)
 * @property {boolean} [strictMode.strictUndefined] Throw error when data is undefined
 * @property {boolean} [strictMode.strictNull] Throw error when data is null
 */

/**
 * Applies Schema on UpdateFilter operations
 * @template {object} S
 * @template {MongoDB.UpdateFilter<S>} T
 * @param {T} update
 * @param {S} schema
 * @param {SchemaOptions} [options]
 * @returns {T}
 */
module.exports.UpdateFilter = (update, schema, options) => {
    if (typeof update.$addToSet === "object") {
        update.$addToSet = Obj2Schema.compare(
            update.$addToSet,
            schema,
            Object.assign(options, { noUndefined: true })
        );
    }
    if (typeof update.$setOnInsert === "object") {
        update.$setOnInsert = Obj2Schema.compare(
            update.$setOnInsert,
            schema,
            Object.assign(options, { noUndefined: true })
        );
    }
    if (typeof update.$set === "object") {
        update.$set = Obj2Schema.compare(
            update.$set,
            schema,
            Object.assign(options, { noUndefined: true })
        );
    }
    if (typeof update.$push === "object") {
        for (const [key, value] of Object.entries(update.$push)) {
            const schemaType = Array.isArray(schema[key])
                ? schema[key][0]
                : schema[key];
            if (value.$each) {
                update.$push[key].$each = Obj2Schema.compareArray(
                    update.$push[key].$each,
                    schemaType,
                    options
                );
            } else if (!Obj2Schema.compareOne(value, schemaType, options)) {
                delete update.$push[key];
            }
        }
    }
    return update;
};
