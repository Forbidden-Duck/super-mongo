"use strict";
const MongoClient = require("./MongoClient");

/**
 *
 * @param {ClientConnection | string} connection
 * @param {MongoDB.MongoClientOptions} clientOptions
 * @param {Database[]} dbs
 * @returns {MongoClient}
 */
function SuperMongo(connection, clientOptions, dbs) {
    return new MongoClient(connection, clientOptions, dbs);
}

SuperMongo.MongoClient = MongoClient;
SuperMongo.Utils = require("./utils");
SuperMongo.Collection = require("./structures/Collection");
SuperMongo.Database = require("./structures/Database");
SuperMongo.DataTypes = require("./datatypes");

module.exports = SuperMongo;
