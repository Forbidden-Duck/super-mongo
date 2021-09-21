const MongoDB = require("mongodb");
const Collection = require("./Collection");
const noDbError = "Database has not been initialized";

/**
 * Represents a MongoDB Database
 */
module.exports = class Database {
    /**
     *
     * @param {string} name Name of the database
     * @param {Collection[]} collections
     * @param {MongoDB.DbOptions} [dbOptions]
     */
    constructor(name, collections, dbOptions) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        collections = Array.isArray(collections) ? collections : [];
        collections = collections.filter((coll) => coll instanceof Collection);
        dbOptions = typeof dbOptions === "object" ? dbOptions : {};

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
        this._collections = collections;
        /**
         * @private
         */
        this._dbOptions = dbOptions;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._name;
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
     * @returns {MongoDB.DbOptions}
     */
    get dbOptions() {
        return { ...this._dbOptions };
    }

    /**
     * Initialise the database
     * @param {MongoDB.Db} db
     * @returns {Promise<Database>}
     */
    async init(db) {
        if (!(db instanceof MongoDB.Db)) {
            throw new TypeError("db must be instance of MongoDB.Db");
        }
        this._db = db;
        this._name = db.databaseName;
        const listColls = await this.db.collections();
        for (const coll of this._collections) {
            if (!(coll._coll instanceof MongoDB.Collection)) {
                const findColl = listColls.find(
                    (item) => item.collectionName === coll.name
                );
                if (findColl) coll._coll = findColl;
                else if (coll.options.createIfNotExist) {
                    coll._coll = await this.db.createCollection(
                        coll.name,
                        coll.options.collectionOptions
                    );
                } else console.warn(`${coll.name} doesn't exist`);
            }
        }
        return this;
    }

    /**
     * @private
     */
    close() {
        if (!this._db) throw new TypeError(noDbError);
        this._db = null;
        this._collections.forEach((coll) => {
            coll.close();
        });
    }

    /**
     * Returns a reference to a Collection
     * @param {string} collName
     * @returns {Collection}
     */
    collection(collName) {
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
            else if (coll.options.createIfNotExist)
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
     * @param {Collection | string} collName
     * @param {MongoDB.CommandOperationOptions} [options]
     * @returns {Promise<boolean>}
     */
    removeCollection(collName, options) {
        if (!this._db) throw new TypeError(noDbError);
        if (collName instanceof Collection) {
            collName = coll.name;
        } else if (typeof coll !== "string") {
            throw new TypeError(
                "coll must be a string or an instance of Collection"
            );
        }
        const coll = this._collections.find((c) => c.name === collName);
        if (coll instanceof Collection) {
            return coll.drop(options);
        }
        return false;
    }

    /**
     * Rename a collection
     * @param {string} collName
     * @param {string} newCollName
     * @param {MongoDB.RenameOptions} options
     * @returns {Promise<Collection>}
     */
    renameCollection(collName, newCollName, options) {
        if (!this._db) throw new TypeError(noDbError);
        const collection = this.collection(collName);
        if (!collName) throw new TypeError(`${collName} does not exist`);
        return collection.rename(newCollName, options);
    }
};
