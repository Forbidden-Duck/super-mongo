"use strict";
const MongoClient = require("./MongoClient");
const Database = require("./structures/Database");
const MongoDB = require("mongodb");

/**
 * @typedef {object} ClientConnection
 * @property {string} address represents the address (i.e. localhost:27017)
 * @property {string} [host] represents the host (where the user auths to) (i.e. mydatabase)
 * @property {string} [username] login username
 * @property {string} [password] login password
 */

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
