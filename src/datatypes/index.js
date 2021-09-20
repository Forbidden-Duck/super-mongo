const bson = require("bson");

module.exports.Ignore = true; // Used to ignore important fields (i.e. _id)

module.exports.JSArray = Array;

module.exports.BSONRegExp = bson.BSONRegExp;

module.exports.BSONSymbol = bson.BSONSymbol;

module.exports.BSONMap = bson.Map;

module.exports.BSONBinary = bson.Binary;

module.exports.JSBoolean = Boolean;

module.exports.BSONCode = bson.Code;

module.exports.JSDate = Date;

module.exports.BSONDecimal128 = bson.Decimal128;

module.exports.BSONDouble = bson.Double;

module.exports.BSONInt32 = bson.Int32;

module.exports.JSInt64 = Number;

module.exports.BSONLong = bson.Long;

module.exports.BSONMaxKey = bson.MaxKey;

module.exports.BSONMinKey = bson.MinKey;

module.exports.JSObject = Object;

module.exports.BSONObjectID = bson.ObjectID;

module.exports.JSString = String;

module.exports.BSONTimestamp = bson.Timestamp;
