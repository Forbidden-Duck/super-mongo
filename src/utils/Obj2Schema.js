const Types = require("./Types");

/**
 * Compare and force an obj to follow the schema rules
 * @template {object} T
 * @param {T} obj
 * @param {T} schema
 * @param {{ noUndefined: boolean, noNull: boolean }} [options]
 * @returns
 */
module.exports.compare = (obj, schema, options) => {
    options = typeof options === "object" ? options : {};
    const data = Object.assign({}, obj);
    for (const [key, value] of Object.entries(data)) {
        if (
            !schema[key] ||
            (!(data[key] instanceof schema[key]) &&
                !Types.checkType2Primitives(data[key], schema[key]) &&
                ![null, undefined].includes(data[key])) ||
            (data[key] === undefined && options.noUndefined) ||
            (data[key] === null && options.noNull)
        ) {
            delete data[key];
        }
    }
    if (!options.noUndefined) {
        for (const key of Object.keys(schema).filter(
            (item) => data[item] === undefined
        )) {
            data[key] = undefined;
        }
    }
    return data;
};
