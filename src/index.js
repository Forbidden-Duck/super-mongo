"use strict";
const MongoClient = require("./MongoClient");

/**
 *
 * @param {ClientConnection | string} connection
 * @param {Database[]} dbs
 * @param {MongoDB.MongoClientOptions} [clientOptions]
 */
function SuperMongo(connection, dbs, clientOptions) {
    return new MongoClient(connection, dbs, clientOptions);
}

SuperMongo.MongoClient = MongoClient;
SuperMongo.Utils = require("./utils");
SuperMongo.Collection = require("./structures/Collection");
SuperMongo.Database = require("./structures/Database");
SuperMongo.DataTypes = require("./datatypes");

module.exports = SuperMongo;
