const MongoDB = require("mongodb");
const Collection = require("./Collection");

/**
 * Represents a MongoDB Database
 */
module.exports = class Database {
    /**
     *
     * @param {MongoDB.Db} db
     * @param {Collection[]} collections
     */
    constructor(db, collections) {
        collections = Array.isArray(collections) ? collections : [];
        collections = collections.filter((coll) => coll instanceof Collection);
        if (!(db instanceof MongoDB.Db)) {
            throw new TypeError("db must be instance of MongoDB.Db");
        }
        /**
         * @private
         */
        this._db = db;
        /**
         * @private
         */
        this._collections = collections;
        /**
         * @private
         */
        this._dbInitialized = false;
        async () => {
            const listColls = await this.db.collections();
            this.collections.forEach((coll) => {
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
            });
            this._dbInitialized = true;
        };
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
     * Whether not the asynchronous tasks have finished
     * @returns {boolean}
     */
    get dbInitialized() {
        return this._dbInitialized;
    }

    /**
     * Wait for the database to be initialized
     * @param {number} [intervalMS=250] How often should it check (default is 250 ms)
     * @param {number} [timeToWait=10000] How long until it stops (default is 10000 ms)
     * @returns {Promise<[Database, number]>} Database and time it took to initialize
     */
    waitForDB(intervalMS = 250, timeToWait = 10000) {
        const timeToReady = 0;
        return new Promise((resolve, reject) => {
            const intervalID = setInterval(() => {
                timeToReady += intervalMS;
                if (this.dbInitialized === true) {
                    clearInterval(intervalID);
                    resolve([this, timeToReady]);
                } else if (timeToReady >= timeToWait) {
                    reject(
                        new Error(
                            `Failed to initialize the database after ${
                                timeToReady / 1000
                            } seconds`
                        )
                    );
                }
            }, intervalMS);
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
        const collection = this.collection(collName);
        if (!collName) throw new TypeError(`${collName} does not exist`);
        return collection.rename(newCollName, options);
    }
};
