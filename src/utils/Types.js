const datatypes = require("../datatypes");

module.exports.checkType = (type) => {
    for (const datatype of Object.values(datatypes)) {
        // Force types to be equal to datatypes
        if (type === datatype) {
            return true;
        }
    }
    return false;
};

module.exports.checkType2Primitives = (value, type) => {
    switch (type) {
        case datatypes.JSArray:
            return datatypes.JSArray.isArray(value);
        case datatypes.JSBoolean:
            return typeof value === "boolean";
        case datatypes.JSInt64:
            return typeof value === "number";
        case datatypes.JSString:
            return typeof value === "string";
        case datatypes.JSObject:
            return !!value && value.constructor === datatypes.JSObject;
        default:
            return false;
    }
};
