const MongoDB = require("mongodb");
const datatypes = require("../datatypes");
const utils = require("../utils");
const noCollError = "Collection has not been initialized";

/**
 * @typedef {object} Options
 * @property {boolean} [createIfNotExist] creates the collection if it doesn't exist
 * @property {MongoDB.CreateCollectionOptions} [collectionOptions] options applied to collection if it doesn't exist
 * @property {SchemaOptions} [defaultSchemaOptions] options to be applied directly to every available SchemaOption
 */

/**
 * @typedef {object} SchemaOptions
 * @property {boolean} [noUndefined]
 * @property {boolean} [noNull]
 * @property {boolean} [keepType] Does not replace invalid types with undefined
 * @property {object} [strictMode]
 * @property {boolean} [strictMode.strictType] Throw error when data is of incorrect type (exc. null & undefined)
 * @property {boolean} [strictMode.strictUndefined] Throw error when data is undefined
 * @property {boolean} [strictMode.strictNull] Throw error when data is null
 */

/**
 * Represents a MongoDB Collection
 * @template {Object<string, datatypes.Ignore | datatypes.JSArray | datatypes.BSONRegExp | datatypes.BSONSymbol
 * | datatypes.BSONBinary | datatypes.BSONBinary | Boolean | datatypes.BSONCode
 * | Date | datatypes.BSONDecimal128 | datatypes.BSONDouble | datatypes.BSONInt32
 * | Number | datatypes.BSONLong | datatypes.BSONMaxKey | datatypes.BSONMinKey | null
 * | Object | datatypes.JSObject |datatypes.BSONObjectID | String | datatypes.BSONTimestamp
 * | undefined>} S
 */
module.exports = class Collection {
    /**
     *
     * @param {string} name
     * @param {S} schema
     * @param {Options} [options]
     * @param {MongoDB.Collection} [coll]
     */
    constructor(name, schema, options, coll) {
        options = typeof options === "object" ? options : {};
        options.defaultSchemaOptions =
            typeof options.defaultSchemaOptions === "object"
                ? options.defaultSchemaOptions
                : {};
        schema = typeof schema === "object" ? schema : {};
        for (const [key, type] of Object.entries(schema)) {
            if (
                !utils.Types.checkType(type) &&
                !utils.Types.checkType2Primitives(type, datatypes.JSObject) &&
                !utils.Types.checkType2Primitives(type, datatypes.JSArray)
            ) {
                throw new TypeError(`${key}:${type} is invalid type`);
            }
        }
        if (coll && !(coll instanceof MongoDB.Collection)) {
            throw new TypeError("coll must be a MongoDB.Collection instance");
        } else if (coll instanceof MongoDB.Collection) {
            name = coll.collectionName;
        }
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }

        /**
         * @private
         */
        this._tempName = name;
        /**
         * @private
         * @type {Options}
         */
        this._options = options;
        /**
         * @private
         * @type {S}
         */
        this._schema = schema;
        /**
         * @private
         * @type {MongoDB.Collection}
         */
        this._coll = coll;
    }

    /**
     * @returns {string}
     */
    get name() {
        if (!this._coll) return this._tempName;
        return this._coll.collectionName;
    }

    /**
     * @returns {string}
     */
    get dbName() {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.dbName;
    }

    /**
     * @returns {Options}
     */
    get options() {
        return { ...this._options };
    }

    /**
     * @returns {Promise<MongoDB.Document>}
     */
    get collectionOptions() {
        if (!this._coll) throw new TypeError(noCollError);
        return { ...this._coll.options };
    }

    /**
     * @returns {S}
     */
    get schema() {
        return { ...this._schema };
    }

    /**
     * @returns {MongoDB.Collection}
     */
    get coll() {
        return this._coll;
    }

    /**
     * @private
     */
    close() {
        if (!this._coll) throw new TypeError(noCollError);
        this._coll = null;
    }

    /**
     * Execute an aggregation framework pipeline against the collection, needs MongoDB >= 2.2
     * @param {MongoDB.Document[]} pipeline
     * @param {MongoDB.AggregateOptions} [options]
     * @returns {Promise<S[]>}
     */
    aggregate(pipeline, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.aggregate(pipeline, options).toArray();
    }

    /**
     * Creates an index on the db and collection.
     * @param {MongoDB.IndexSpecification} spec
     * @param {MongoDB.CreateIndexesOptions} [options]
     * @returns {Promise<string>}
     */
    createIndex(spec, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.createIndex(spec, options);
    }

    /**
     * Delete multiple documents from the collection
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.DeleteOptions} [options]
     * @returns {Promise<MongoDB.DeleteResult>}
     */
    deleteMany(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.deleteMany(filter, options);
    }

    /**
     * Delete a document from the collection
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.DeleteOptions} [options]
     * @returns {Promise<MongoDB.DeleteResult>}
     */
    deleteOne(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.deleteOne(filter, options);
    }

    /**
     * The distinct command returns a list of distinct values for the given key across the collection.
     * @template {keyof S} T
     * @param {T} key
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.CommandOperationOptions} [options]
     * @return {Promise<S[T][]>}
     */
    distinct(key, filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.distinct(key, filter, options);
    }

    /**
     * Drop the collection from the database, removing it permanently. New accesses will create a new collection.
     * @param {MongoDB.CommandOperationOptions} [options]
     * @returns {Promise<boolean>}
     */
    drop(options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.drop(options);
    }

    /**
     * Drops an index from this collection.
     * @param {string} name
     * @param {MongoDB.CommandOperationOptions} [options]
     * @returns {Promise<MongoDB.Document>}
     */
    dropIndex(name, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.dropIndex(name, options);
    }

    /**
     * Creates an array for the filter that can be used to iterate over results from MongoDB
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.FindOptions<S>} [options]
     * @returns {Promise<S[]>}
     */
    find(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.find(filter, options).toArray();
    }

    /**
     * Fetches the first document that matches the filter
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.FindOptions<S>} [options]
     * @returns {Promise<S>}
     */
    findOne(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.findOne(filter, options);
    }

    /**
     * Fetches the first document that matches the filter and deletes it
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.FindOneAndDeleteOptions} [options]
     * @returns {Promise<MongoDB.ModifyResult<S>>}
     */
    findOneAndDelete(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.findOneAndDelete(filter, options);
    }

    /**
     * Fetches the first document that matches the filter and replaces it
     * @param {S} replacement
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.FindOneAndReplaceOptions} [options]
     * @param {SchemaOptions} [schemaOptions] Applied to replacement
     * @returns {Promise<MongoDB.ModifyResult<S>>}
     */
    findOneAndReplace(replacement, filter, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        return this._coll.findOneAndReplace(
            filter,
            utils.Obj2Schema.compare(replacement, this.schema, schemaOptions),
            options
        );
    }

    /**
     * Find a document and update it in one atomic operation. Requires a write lock for the duration of the operation.
     * @param {MongoDB.UpdateFilter<S>} update
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.FindOneAndUpdateOptions} [options]
     * @param {SchemaOptions} [schemaOptions] Applied to update
     * @returns {Promise<MongoDB.ModifyResult<S>>}
     */
    findOneAndUpdate(update, filter, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        // Apply schema to specific operations
        utils.Operations.UpdateFilter(update, this.schema, schemaOptions);
        return this._coll.findOneAndUpdate(filter, update, options);
    }

    /**
     * Checks if one or more indexes exist on the collection, fails on first non-existing index
     * @param {string | string[]} filter
     * @param {MongoDB.IndexInformationOptions} [options]
     * @returns {Promise<boolean>}
     */
    indexExists(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.indexExists(filter, options);
    }

    /**
     * Retrieve all the indexes on the collection.
     * @param {MongoDB.IndexInformationOptions} [options]
     * @returns {Promise<MongoDB.Document>}
     */
    indexes(options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.indexes(options);
    }

    /**
     * Inserts an array of documents into MongoDB. If documents passed in do not contain the _id field, one will be added to each of the documents missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
     * @param {S[]} insert
     * @param {MongoDB.BulkWriteOptions} options
     * @param {SchemaOptions} schemaOptions
     * @returns {Promise<MongoDB.InsertManyResult>}
     */
    insertMany(insert, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        return this._coll.insertMany(
            utils.Obj2Schema.compareArray(insert, this.schema, schemaOptions),
            options
        );
    }

    /**
     * Inserts a document into MongoDB. If the document passed in does not contain the _id field, one will be added missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
     * @param {S} insert
     * @param {MongoDB.InsertOneOptions} [options]
     * @param {SchemaOptions} [schemaOptions]
     * @returns {Promise<MongoDB.InsertOneResult>}
     */
    insertOne(insert, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        return this._coll.insertOne(
            utils.Obj2Schema.compare(insert, this.schema, schemaOptions),
            options
        );
    }

    /**
     * Returns if the collection is a capped collection
     * @param {MongoDB.OperationOptions} [options]
     * @returns {Promise<boolean>}
     */
    isCapped(options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.isCapped(options);
    }

    /**
     * Rename the collection.
     * @param {string} name
     * @param {MongoDB.RenameOptions} [options]
     * @returns {Promise<Collection>}
     */
    async rename(name, options) {
        if (!this._coll) throw new TypeError(noCollError);
        const res = await this._coll.rename(name, options);
        this._coll = res;
        return this;
    }

    /**
     * Fetches the first document that matches the filter
     * @param {S} replacement
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.ReplaceOptions} [options]
     * @param {SchemaOptions} [schemaOptions] Applied to replacement
     * @returns {Promise<MongoDB.UpdateResult>}
     */
    replaceOne(replacement, filter, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        return this._coll.replaceOne(
            filter,
            utils.Obj2Schema.compare(replacement, this.schema, schemaOptions),
            options
        );
    }

    /**
     * Get all the collection statistics.
     * @param {MongoDB.CollStatsOptions} [options]
     * @returns {Promise<MongoDB.CollStats>}
     */
    stats(options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.stats(options);
    }

    /**
     * Return the size based on the filter
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.CountDocumentsOptions} [options]
     * @returns {Promise<number>}
     */
    size(filter, options) {
        if (!this._coll) throw new TypeError(noCollError);
        return this._coll.countDocuments(filter, options);
    }

    /**
     * Find many documents and update them in one atomic operation. Requires a write lock for the duration of the operation.
     * @param {MongoDB.UpdateFilter<S>} update
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.UpdateOptions} [options]
     * @param {SchemaOptions} [schemaOptions] Applied to update
     * @returns {Promise<MongoDB.UpdateResult>}
     */
    updateMany(update, filter, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        // Apply schema to specific operations
        utils.Operations.UpdateFilter(update, this.schema, schemaOptions);
        return this._coll.updateMany(filter, update, options);
    }

    /**
     * Find a document and update it in one atomic operation. Requires a write lock for the duration of the operation.
     * @param {MongoDB.UpdateFilter<S>} update
     * @param {MongoDB.Filter<S>} [filter]
     * @param {MongoDB.UpdateOptions} [options]
     * @param {SchemaOptions} [schemaOptions] Applied to update
     * @returns {Promise<MongoDB.UpdateResult>}
     */
    updateOne(update, filter, options, schemaOptions) {
        if (!this._coll) throw new TypeError(noCollError);
        schemaOptions = typeof schemaOptions === "object" ? schemaOptions : {};
        schemaOptions = Object.assign(
            schemaOptions,
            this.options.defaultSchemaOptions
        );
        // Apply schema to specific operations
        utils.Operations.UpdateFilter(update, this.schema, schemaOptions);
        return this._coll.updateOne(filter, update, options);
    }
};
