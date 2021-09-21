import * as MongoDB from "mongodb";
import * as CryptoJS from "crypto-js";
import * as BSON from "bson";

declare function SuperMongo(
    connection: SuperMongo.ClientConnection | string,
    dbs: SuperMongo.Database,
    clientOptions: MongoDB.MongoClientOptions
): SuperMongo.MongoClient;

declare namespace SuperMongo {
    interface ClientConnection {
        /**
         * represents the address (i.e. localhost:27017)
         */
        address: string;
        /**
         * represents the host (where the user auths to) (i.e. mydatabase)
         */
        host?: string;
        /**
         * login username
         */
        username?: string;
        /**
         * login password
         */
        password?: string;
    }

    interface SchemaOptions {
        noUndefined?: boolean;
        noNull?: boolean;
        /**
         * Does not replace invalid types with undefined
         */
        keepType: boolean;
        strictMode?: {
            /**
             * Throw error when data is of incorrect type (exc. null & undefined)
             */
            strictType: boolean;
            /**
             * Throw error when data is undefined
             */
            strictUndefined: boolean;
            /**
             * Throw error when data is null
             */
            strictNull: boolean;
        };
    }

    interface CollectionOptions {
        /**
         * creates the collection if it does not exist
         */
        createIfNotExist?: boolean;
        /**
         * options applied to collection if it doesn't exist
         */
        collectionOptions?: MongoDB.CreateCollectionOptions;
        /**
         * options to be applied directly to every available SchemaOption
         */
        defaultSchemaOptions: SuperMongo.SchemaOptions;
    }

    /**
     * Recreate cryptojs typings as they are not exported
     */
    interface CryptoJSHasherHelper {
        (
            message: CryptoJS.lib.WordArray | string,
            cfg?: object
        ): CryptoJS.lib.WordArray;
    }

    /**
     * Recreate cryptojs typings as they are not exported
     */
    interface CryptoJSHmacHasherHelper {
        (
            message: CryptoJS.lib.WordArray | string,
            key?: CryptoJS.lib.WordArray | string
        ): CryptoJS.lib.WordArray;
    }

    /**
     * Recreate cryptojs typings as they are not exported
     */
    interface CryptoJSHasher {
        _createHelper: (
            hasher: SuperMongo.CryptoJSHasherStatic
        ) => SuperMongo.CryptoJSHasherHelper;
        _createHmacHelper: (
            hasher: SuperMongo.CryptoJSHasherStatic
        ) => SuperMongo.CryptoJSHmacHasherHelper;
    }

    /**
     * Recreate cryptojs typings as they are not exported
     */
    interface CryptoJSHasherStatic {
        create: (cfg?: object) => SuperMongo.CryptoJSHasher;
    }

    /**
     * Recreate cryptojs typings as they are not exported
     */
    interface CryptoJSKDFOption {
        keySize?: number;
        hasher?: SuperMongo.CryptoJSHasherStatic;
        iterations?: number;
    }

    export const DataTypes = {
        /**
         * Used to ignore important fields (i.e. _id)
         */
        Ignore: true,
        JSArray: Array,
        BSONRegExp: BSON.BSONRegExp,
        BSONSymbol: BSON.BSONSymbol,
        BSONMap: MapConstructor, // TypeScript does not like BSON.Map
        BSONBinary: BSON.Binary,
        JSBoolean: Boolean,
        BSONCode: BSON.Code,
        JSDate: Date,
        BSONDecimal128: BSON.Decimal128,
        BSONInt32: BSON.Int32,
        JSInt64: Number,
        BSONLong: BSON.Long,
        BSONMaxKey: BSON.MaxKey,
        BSONMinKey: BSON.MinKey,
        JSObject: Object,
        BSONObjectID: BSON.ObjectID,
        JSString: String,
        BSONTimestamp: BSON.Timestamp,
    };

    export type DataTypes = {
        /**
         * Used to ignore important fields (i.e. _id)
         */
        Ignore: true;
        JSArray: Array;
        BSONRegExp: BSON.BSONRegExp;
        BSONSymbol: BSON.BSONSymbol;
        BSONMap: MapConstructor; // TypeScript does not like BSON.Map
        BSONBinary: BSON.Binary;
        JSBoolean: Boolean;
        BSONCode: BSON.Code;
        JSDate: Date;
        BSONDecimal128: BSON.Decimal128;
        BSONInt32: BSON.Int32;
        JSInt64: Number;
        BSONLong: BSON.Long;
        BSONMaxKey: BSON.MaxKey;
        BSONMinKey: BSON.MinKey;
        JSObject: Object;
        BSONObjectID: BSON.ObjectID;
        JSString: String;
        BSONTimestamp: BSON.Timestamp;
    };

    /**
     * Represents the MongoDB Client
     */
    export class MongoClient {
        private _connectionURL: string;
        private _client: MongoDB.MongoClient;
        private _clientOptions: MongoDB.MongoClientOptions;
        private _databases: SuperMongo.Database[];
        constructor(
            connection: SuperMongo.ClientConnection | string,
            dbs: SuperMongo.Database[],
            clientOptions?: MongoDB.MongoClientOptions
        );
        get connectionURL(): string;
        get client(): MongoDB.MongoClient;
        get clientOptions(): MongoDB.MongoClientOptions;
        get databases(): SuperMongo.Database[];
        /**
         * Close the db and its underlying connections
         * @param force
         */
        close(force?: boolean): Promise<void>;
        /**
         * Connect to MongoDB using the connectionURL
         */
        connect(): Promise<MongoClient>;
        /**
         * Returns a reference to a Database
         * @param dbName
         */
        database(dbName: string): SuperMongo.Database;
        /**
         * Create a new Db instance sharing the current socket connections.
         * @param db
         */
        db(db: SuperMongo.Database): Promise<SuperMongo.Database>;
    }

    /**
     * Represents a MongoDB Database
     */
    export class Database {
        private _name: string;
        private _db: MongoDB.Db;
        private _collections: SuperMongo.Collection[];
        private _dbOptions: MongoDB.DbOptions;
        constructor(
            name: string,
            collections: SuperMongo.Collection[],
            dbOptions?: MongoDB.DbOptions
        );
        get name(): string;
        get db(): MongoDB.Db;
        get collections(): SuperMongo.Collection[];
        get dbOptions(): MongoDB.DbOptions;
        private close();
        /**
         * Initialise the database
         * @param db
         */
        init(db: MongoDB.Db): Promise<SuperMongo.Database>;
        /**
         * Returns a reference to a Collection
         * @param collName
         */
        collection(collName: string): SuperMongo.Collection;
        /**
         * Add a collection to the database
         * @param coll
         */
        addCollection(
            coll: SuperMongo.Collection
        ): Promise<SuperMongo.Collection[]> | SuperMongo.Collection[];
        /**
         * Remove a collection from the database
         * @param collName
         * @param options
         */
        removeCollection(
            collName: SuperMongo.Collection | string,
            options?: MongoDB.CommandOperationOptions
        ): Promise<boolean>;
        /**
         * Rename a collection
         * @param collName
         * @param newCollName
         * @param options
         */
        renameCollection(
            collName: string,
            newCollName: string,
            options?: MongoDB.RenameOptions
        ): Promise<SuperMongo.Collection>;
    }

    /**
     * Represents a MongoDB Collection
     */
    export class Collection<S extends { [key: string]: unknown }> {
        private _tempName: string;
        private _options: SuperMongo.CollectionOptions;
        private _schema: S;
        private _coll: MongoDB.Collection;
        constructor(
            name: string,
            schema: S,
            options?: SuperMongo.CollectionOptions,
            coll?: MongoDB.Collection
        );
        get name(): string;
        get dbName(): string;
        get options(): SuperMongo.CollectionOptions;
        get collectionOptions(): MongoDB.CollectionOptions;
        get schema(): S;
        get coll(): MongoDB.Collection;
        private close();
        /**
         * Execute an aggregation framework pipeline against the collection, needs MongoDB >= 2.2
         * @param pipeline
         * @param options
         */
        aggregate(
            pipeline: MongoDB.Document[],
            options?: MongoDB.AggregateOptions
        ): Promise<S[]>;
        /**
         * Creates an index on the db and collection
         * @param spec
         * @param options
         */
        createIndex(
            spec: MongoDB.IndexSpecification,
            options?: MongoDB.CreateIndexesOptions
        ): Promise<string>;
        /**
         * Delete multiple documents from the collection
         * @param filter
         * @param options
         */
        deleteMany(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.DeleteOptions
        ): Promise<MongoDB.DeleteResult>;
        /**
         * Delete a document from the collection
         * @param filter
         * @param options
         */
        deleteOne(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.DeleteOptions
        ): Promise<MongoDB.DeleteResult>;
        /**
         * The distinct command returns a list of distinct values for the given key across the collection.
         * @param key
         * @param filter
         * @param options
         */
        distinct<T extends keyof S>(
            key: T,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.CommandOperationOptions
        ): Promise<S[T][]>;
        /**
         * Drop the collection from the database, removing it permanently. New accesses will create a new collection.
         * @param options
         */
        drop(options?: MongoDB.CommandOperationOptions): Promise<boolean>;
        /**
         * Drops an index from this collection.
         * @param name
         * @param options
         */
        dropIndex(
            name: string,
            options?: MongoDB.CommandOperationOptions
        ): Promise<MongoDB.Document>;
        /**
         * Creates an array from the filter that can be used to iterate over results from MongoDB
         * @param filter
         * @param options
         */
        find(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.FindOptions<S>
        ): Promise<S[]>;
        /**
         * Fetches the first document that matches the filter
         * @param filter
         * @param options
         */
        findOne(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.FindOptions<S>
        ): Promise<S>;
        /**
         * Fetches the first document that matches the filter and deletes it
         * @param filter
         * @param options
         */
        findOneAndDelete(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.FindOneAndDeleteOptions
        ): Promise<MongoDB.ModifyResult<S>>;
        /**
         * Fetches the first document that matches the filter and replaces it
         * @param replacement
         * @param filter
         * @param options
         * @param schemaOptions Applied to replacement
         */
        findOneAndReplace(
            replacement: S,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.FindOneAndReplaceOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.ModifyResult<S>>;
        /**
         * Find a document and update it in one atomic operation. Requires a write lock for the duration of the operation.
         * @param update
         * @param filter
         * @param options
         * @param schemaOptions Applied to update
         */
        findOneAndUpdate(
            update: MongoDB.UpdateFilter<S>,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.FindOneAndUpdateOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.ModifyResult<S>>;
        /**
         * Checks if one ore more indexes exist on the collection, fails on first non-existing index
         * @param filter
         * @param options
         */
        indexExists(
            filter: string | string[],
            options?: MongoDB.IndexInformationOptions
        ): Promise<boolean>;
        /**
         * Retrieve all the indexes on the collection.
         * @param options
         */
        indexes(
            options?: MongoDB.IndexInformationOptions
        ): Promise<MongoDB.Document>;
        /**
         * Inserts an array of documents into MongoDB. If documents passed in do not contain the _id field, one will be added to each of the documents missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
         * @param insert
         * @param options
         * @param schemaOptions
         */
        insertMany(
            insert: S[],
            options?: MongoDB.BulkWriteOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.InsertManyResult>;
        /**
         * Inserts a document into MongoDB. If the document passed in does not contain the _id field, one will be added missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
         * @param insert
         * @param options
         * @param schemaOptions
         */
        insertOne(
            insert: S,
            options?: MongoDB.InsertOneOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.InsertOneResult>;
        /**
         * Returns if the collection is a capped collection
         * @param options
         */
        isCapped(options?: MongoDB.OperationOptions): Promise<boolean>;
        /**
         * Rename the collection.
         * @param name
         * @param options
         */
        rename(
            name: string,
            options?: MongoDB.RenameOptions
        ): Promise<SuperMongo.Collection>;
        /**
         * Fetches the first document that matches the filter
         * @param replacement
         * @param filter
         * @param options
         * @param schemaOptions Applied to replacement
         */
        replaceOne(
            replacement: S,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.ReplaceOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.UpdateResult>;
        /**
         * Get all the collection statistics.
         * @param options
         */
        stats(options?: MongoDB.CollStatsOptions): Promise<MongoDB.CollStats>;
        /**
         * Return the size based on the filter
         * @param filter
         * @param options
         */
        size(
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.CountDocumentsOptions
        ): Promise<number>;
        /**
         * Find many documents and update them in one atomic operation. Requires a write lock for the duration of the operation.
         * @param update
         * @param filter
         * @param options
         * @param schemaOptions Applied to update
         */
        updateMany(
            update: MongoDB.UpdateFilter<S>,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.UpdateOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.UpdateResult>;
        /**
         * Find a document and update it in one atomic operation. Requires a write lock for the duration of the operation
         * @param update
         * @param filter
         * @param options
         * @param schemaOptions Applied to update
         */
        updateOne(
            update: MongoDB.UpdateFilter<S>,
            filter?: MongoDB.Filter<S>,
            options?: MongoDB.UpdateOptions,
            schemaOptions?: SuperMongo.SchemaOptions
        ): Promise<MongoDB.UpdateResult>;
    }

    export const Utils = {
        Base64: {
            /**
             * Encode a string to base64
             * @param str
             * @returns
             */
            encode: (str: string) => value as string,
            /**
             * Decode a base64 string
             * @param encoded
             * @returns
             */
            decode: (encoded: string) => value as string,
        },
        Hash: {
            /**
             * Create a new Salt+Hash
             * @param str
             * @param cfg
             * @returns
             */
            create: (str: string, cfg?: SuperMongo.CryptoJSKDFOption) =>
                value as string,
            /**
             * Compare a Salt+Hash
             * @param str
             * @param salthash
             * @param cfg
             * @returns
             */
            compare: (
                str: string,
                salthash: string,
                cfg?: SuperMongo.CryptoJSKDFOption
            ) => value as boolean,
        },
        ID: {
            create: (
                sha?:
                    | "SHA1"
                    | "SHA224"
                    | "SHA256"
                    | "SHA3"
                    | "SHA384"
                    | "SHA512"
            ) => value as string,
        },
        Obj2Schema: {
            /**
             * Compare and force an obj to follow the schema rules
             * @param obj
             * @param schema
             * @param options
             * @returns
             */
            compare: <T extends unknown, S extends T>(
                obj: S,
                schema: T,
                options?: SuperMongo.SchemaOptions
            ) => value as T,
            /**
             * Compare a single value and type
             * @param value
             * @param schemaType
             * @param options
             * @returns
             */
            compareOne: <T extends unknown, S extends T>(
                value: any,
                schemaType: any,
                options?: SuperMongo.SchemaOptions
            ) => value as boolean,
            /**
             * Compare and force an array to follow the schema rules
             * @param arr
             * @param schemaType
             * @param options
             * @returns
             */
            compareArray: <T extends unknown, S extends T[]>(
                arr: S,
                schemaType: any,
                options?: SuperMongo.SchemaOptions
            ) => value as T[],
        },
        Operations: {
            /**
             * Applies Schema on UpdateFilter operations
             * @param update
             * @param schema
             * @param options
             * @returns
             */
            UpdateFilter: <
                S extends unknown,
                T extends MongoDB.UpdateFilter<S>
            >(
                update: T,
                schema: S,
                options?: SuperMongo.SchemaOptions
            ) => value as T,
        },
        Token: {
            /**
             * Create a random token
             * @param sha
             * @param str
             * @returns
             */
            create: (
                sha?:
                    | "SHA1"
                    | "SHA224"
                    | "SHA256"
                    | "SHA3"
                    | "SHA384"
                    | "SHA512",
                str: string
            ) => value as string,
        },
        Types: {
            checkType: (type: SuperMongo.DataTypes) => value as boolean,
            checkType2Primitives: (value: any, type: SuperMongo.DataTypes) =>
                value as boolean,
        },
    };

    export type Utils = {
        Base64: {
            /**
             * Encode a string to base64
             * @param str
             * @returns
             */
            encode: (str: string) => string;
            /**
             * Decode a base64 string
             * @param encoded
             * @returns
             */
            decode: (encoded: string) => string;
        };
        Hash: {
            /**
             * Create a new Salt+Hash
             * @param str
             * @param cfg
             * @returns
             */
            create: (str: string, cfg?: SuperMongo.CryptoJSKDFOption) => string;
            /**
             * Compare a Salt+Hash
             * @param str
             * @param salthash
             * @param cfg
             * @returns
             */
            compare: (
                str: string,
                salthash: string,
                cfg?: SuperMongo.CryptoJSKDFOption
            ) => boolean;
        };
        ID: {
            create: (
                sha?:
                    | "SHA1"
                    | "SHA224"
                    | "SHA256"
                    | "SHA3"
                    | "SHA384"
                    | "SHA512"
            ) => string;
        };
        Obj2Schema: {
            /**
             * Compare and force an obj to follow the schema rules
             * @param obj
             * @param schema
             * @param options
             * @returns
             */
            compare: <T extends unknown, S extends T>(
                obj: S,
                schema: T,
                options?: SuperMongo.SchemaOptions
            ) => T;
            /**
             * Compare a single value and type
             * @param value
             * @param schemaType
             * @param options
             * @returns
             */
            compareOne: <T extends unknown, S extends T>(
                value: any,
                schemaType: any,
                options?: SuperMongo.SchemaOptions
            ) => boolean;
            /**
             * Compare and force an array to follow the schema rules
             * @param arr
             * @param schemaType
             * @param options
             * @returns
             */
            compareArray: <T extends unknown, S extends T[]>(
                arr: S,
                schemaType: any,
                options?: SuperMongo.SchemaOptions
            ) => T[];
        };
        Operations: {
            /**
             * Applies Schema on UpdateFilter operations
             * @param update
             * @param schema
             * @param options
             * @returns
             */
            UpdateFilter: <
                S extends unknown,
                T extends MongoDB.UpdateFilter<S>
            >(
                update: T,
                schema: S,
                options?: SuperMongo.SchemaOptions
            ) => T;
        };
        Token: {
            /**
             * Create a random token
             * @param sha
             * @param str
             * @returns
             */
            create: (
                sha?:
                    | "SHA1"
                    | "SHA224"
                    | "SHA256"
                    | "SHA3"
                    | "SHA384"
                    | "SHA512",
                str: string
            ) => string;
        };
        Types: {
            checkType: (type: SuperMongo.DataTypes) => boolean;
            checkType2Primitives: (
                value: any,
                type: SuperMongo.DataTypes
            ) => boolean;
        };
    };
}

export = SuperMongo;
