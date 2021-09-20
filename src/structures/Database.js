const MongoDB = require("mongodb");
const Collection = require("./Collection");
const noDbError = "Database does not exist";

/**
 * Represents a MongoDB Database
 */
module.exports = class Database {
    /**
     *
     * @param {string} name Name of the database
     */
    constructor(name) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        /**
         * @private
         */
        this._name = name;
        /**
         * @private
         */
        this._db = null;
        /**
         * @private
         */
        this._collections = [];
    }

    /**
     * @returns {MongoDB.Db}
     */
    get db() {
        return this._db;
    }

    /**
     * @returns {Collection[]}
     */
    get collections() {
        return [...this._collections];
    }

    /**
     * Initialise the database
     * @param {MongoDB.Db} db
     * @param {Collection[]} collections
     * @returns {Promise<Database>}
     */
    async init(db, collections) {
        collections = Array.isArray(collections) ? collections : [];
        collections = collections.filter((coll) => coll instanceof Collection);
        if (!(db instanceof MongoDB.Db)) {
            throw new TypeError("db must be instance of MongoDB.Db");
        }
        this._db = db;
        const listColls = await this.db.collections();
        for (const coll of this.collections) {
            if (!(coll._coll instanceof MongoDB.Collection)) {
                const findColl = listColls.find(
                    (item) => item.collectionName === coll.name
                );
                if (findColl) coll._coll = findColl;
                else if (coll.options.createIfNotExists)
                    coll._coll = await this.db.createCollection(
                        coll.name,
                        coll.options.collectionOptions
                    );
                else console.warn(`${coll.name} doesn't exist`);
            }
        }
        return this;
    }

    /**
     * Returns a reference to a Collection
     * @param {string} collName
     * @returns {Collection}
     */
    collection(collName) {
        if (!this._db) throw new TypeError(noDbError);
        return this.collections.find((coll) => coll.name === collName);
    }

    /**
     * Add a collection to the database
     * @param {Collection} coll
     * @returns {Promise<Collecion[]> | Collection[]}
     */
    async addCollection(coll) {
        if (!this._db) throw new TypeError(noDbError);
        if (!(coll instanceof Collection)) {
            throw new TypeError("coll is not an instance of Collection");
        }
        this._collections.push(coll);
        if (!(coll._coll instanceof MongoDB.Collection)) {
            const listColls = await this.db.collections();
            const findColl = listColls.find(
                (item) => item.collectionName === coll.name
            );
            if (findColl) coll._coll = findColl;
            else if (coll.options.createIfNotExists)
                coll._coll = await this.db.createCollection(
                    coll.name,
                    coll.options.collectionOptions
                );
            else console.warn(`${coll.name} doesn't exist`);
        }
        return this.collections;
    }

    /**
     * Remove a collection from the database
     * @param {Collection | string} collName Runs dropCollection as well
     * @param {MongoDB.CommandOperationOptions} options
     * @returns {Promise<boolean>}
     */
    removeCollection(coll, options) {
        if (!this._db) throw new TypeError(noDbError);
        let collName = coll;
        if (coll instanceof Collection) {
            collName = coll.name;
        } else if (typeof coll !== "string") {
            throw new TypeError(
                "coll must be a string or an instance of Collection"
            );
        }
        return this.db.dropCollection(collName, options);
    }

    /**
     * Rename a collection
     * @param {string} collName
     * @param {string} newCollName
     * @param {MongoDB.RenameOptions} options
     * @returns {Promise<MongoDB.Collection<MongoDB.Document>>}
     */
    renameCollection(collName, newCollName, options) {
        if (!this._db) throw new TypeError(noDbError);
        const collection = this.collection(collName);
        if (!collName) throw new TypeError(`${collName} does not exist`);
        return collection.rename(newCollName, options);
    }
};
