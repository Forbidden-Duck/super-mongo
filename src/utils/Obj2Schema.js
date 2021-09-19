const { JSArray, JSObject } = require("../datatypes");
const Types = require("./Types");

/**
 * @typedef {object} SchemaOptions
 * @property {boolean} noUndefined
 * @property {boolean} noNull
 */

/**
 * Compare and force an obj to follow the schema rules
 * @template {object} T
 * @template {T} S
 * @param {S} obj
 * @param {T} schema
 * @param {SchemaOptions} [options]
 * @returns {T}
 */
module.exports.compare = (obj, schema, options) => {
    options = typeof options === "object" ? options : {};
    const data = Object.assign({}, obj);
    for (const [key, value] of Object.entries(data)) {
        if (!this.compareOne(value, schema[key], options)) delete data[key];
    }
    // Add undefined to missing properties if noUndefined is true
    if (!options.noUndefined) {
        for (const key of Object.keys(schema).filter(
            (item) => data[item] === undefined
        )) {
            data[key] = undefined;
        }
    }
    // Run schema compare on inner object and array properties
    for (const [key, value] of Object.entries(data)) {
        if (Types.checkType2Primitives(value, JSObject)) {
            data[key] = this.compare(value, schema[key], options);
        } else if (
            Types.checkType2Primitives(value, JSArray) &&
            Types.checkType2Primitives(schema[key], JSArray)
        ) {
            data[key] = this.compareArray(value, schema[key][0], options);
        }
    }
    return data;
};

/**
 * Compare a single value and type
 * @template {*} T
 * @template {T} S
 * @param {S} arr
 * @param {T} schema
 * @param {SchemaOptions} [options]
 * @returns {boolean}
 */
module.exports.compareOne = (value, schemaType, options) => {
    options = typeof options === "object" ? options : {};
    function checkInstanceOf(v, s) {
        if (
            !Types.checkType2Primitives(v, JSObject) &&
            !Types.checkType2Primitives(s, JSObject) &&
            !Types.checkType2Primitives(s, JSArray)
        ) {
            return v instanceof s;
        }
        return false;
    }
    return !(
        !schemaType ||
        (!checkInstanceOf(value, schemaType) && // Check instance and primitives (if one works then continue)
            !Types.checkType2Primitives(value, schemaType) &&
            ![null, undefined].includes(value)) || // Ignore null and undefined
        (value === undefined && options.noUndefined) ||
        (value === null && options.noNull)
    );
};

/**
 * Compare and force an array to follow the schema rules
 * @template {object} T
 * @template {T[]} S
 * @param {S} arr
 * @param {T} schema
 * @param {SchemaOptions} [options]
 * @returns {T[]}
 */
module.exports.compareArray = (arr, schemaType, options) => {
    options = typeof options === "object" ? options : {};
    const data = [...arr];
    const index2Delete = [];
    data.forEach((value, index) => {
        if (Types.checkType2Primitives(schemaType, JSObject)) {
            if (Types.checkType2Primitives(value, JSObject)) {
                data[index] = this.compare(value, schemaType, options);
            } else index2Delete.push(index);
        } else if (Types.checkType2Primitives(schemaType, JSArray)) {
            if (Types.checkType2Primitives(value, JSArray)) {
                data[index] = this.compareArray(value, schemaType[0], options);
            } else index2Delete.push(index);
        } else if (!this.compareOne(value, schemaType, options)) {
            index2Delete.push(index);
        }
    });
    return data.filter((value, index) => !index2Delete.includes(index));
};
