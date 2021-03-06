const MongoDB = require("mongodb");
const Database = require("./structures/Database");
const noClientError = "Client is not connected";

/**
 * @typedef {object} ClientConnection
 * @property {string} address represents the address (i.e. localhost:27017)
 * @property {string} [host] represents the host (where the user auths to) (i.e. mydatabase)
 * @property {string} [username] login username
 * @property {string} [password] login password
 */

/**
 * Represents a MongoDB Client
 */
module.exports = class MongoClient {
    /**
     *
     * @param {ClientConnection | string} connection
     * @param {Database[]} dbs
     * @param {MongoDB.MongoClientOptions} [clientOptions]
     */
    constructor(connection, dbs, clientOptions) {
        if (typeof connection === "object") {
            let temp = "mongodb://";
            if (connection.username && connection.password) {
                temp += `${connection.username}:${connection.password}@`;
            }
            temp += `${connection.address}/`;
            if (connection.host) {
                temp += connection.host;
            }
            connection = temp;
        }
        /**
         * @private
         */
        this._connectionURL = connection;
        /**
         * @private
         */
        this._client = null;
        /**
         * @private
         */
        this._clientOptions = clientOptions;
        /**
         * @private
         */
        this._databases = dbs;
    }

    /**
     * @returns {string}
     */
    get connectionURL() {
        return this._connectionURL;
    }

    /**
     * @returns {MongoDB.MongoClient}
     */
    get client() {
        return this._client;
    }

    /**
     * @returns {MongoDB.MongoClientOptions}
     */
    get clientOptions() {
        return { ...this._clientOptions };
    }

    /**
     * @returns {Database[]}
     */
    get databases() {
        return [...this._databases];
    }

    /**
     * Close the db and its underlying connections
     * @param {boolean} [force]
     * @returns {Promise<void>}
     */
    async close(force) {
        await this._client.close(force);
        this._client = null;
        this._databases.forEach((db) => {
            db.close();
        });
    }

    /**
     * Connect to MongoDB using the connectionURL
     * @returns {Promise<MongoClient>}
     */
    async connect() {
        const databases = Array.isArray(this._databases)
            ? this._databases.filter((db) => db instanceof Database)
            : [];
        this._client = await new MongoDB.MongoClient(
            this._connectionURL,
            this._clientOptions
        )
            .connect()
            .catch((err) => {
                if (err.message === "Authentication failed.") {
                    throw new Error("Failed to authenticate with the Database");
                } else throw err;
            });
        const temp = [];
        for (const database of databases) {
            temp.push(await this.db(database));
        }
        this._databases = temp;
        return this;
    }

    /**
     * Returns a reference to a Database
     * @param {string} dbName
     * @returns {Database}
     */
    database(dbName) {
        return this.databases.find((db) => db.name === dbName);
    }

    /**
     * Create a new Db instance sharing the current socket connections.
     * @param {Database} db
     * @returns {Promise<Database>}
     */
    db(db) {
        if (!this._client) throw new TypeError(noClientError);
        if (db.db instanceof MongoDB.Db) {
            throw new TypeError(`${db.name} has already been initialized`);
        }
        return db.init(this._client.db(db.name, db.dbOptions));
    }
};
