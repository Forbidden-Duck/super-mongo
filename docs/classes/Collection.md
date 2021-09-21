# Collection

Represents a MongoDB Collection

## Properties

`.name`

> Name of the collection\
> type [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

`.dBName`

> Name of the database the collection belongs to\
> type [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

`.options`

> Options applied to the collection\
> type `{ createIfNotExist?: boolean, collectionOptions?: MongoDB.CreateCollectionOptions, defaultSchemaOptions?: SchemaOptions }`

`.collectionOptions`

> Options applied to the MongoDB Collection\
> type [MongoDB.CollectionOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/collectionoptions.html)

`.schema`

> Schema applied to the collection\
> type `{ S extends object }`

`.coll`

> Reference to the MongoDB Collection\
> type [MongoDB.Collection](https://mongodb.github.io/node-mongodb-native/4.0/classes/collection.html)

## Constructor

`new SuperMongo.Collection(name, collections, dbOptions)`

> | Parameter | Default   | Description                  | Type                                                                                                                        |
> | --------- | --------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
> | name      | required  | Name of the collection       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                           |
> | schema    | required  | Schema for the collection    | `{ S extends Object }`                                                                                                      |
> | options   | {}        | Options for the collection   | `{ createIfNotExist?: boolean, collectionOptions?: MongoDB.CreateCollectionOptions, defaultSchemaOptions?: SchemaOptions }` |
> | coll      | undefined | MongoDB Collection reference | [MongoDB.Collection](https://mongodb.github.io/node-mongodb-native/4.0/classes/collection.html)                             |

## Functions

`aggregate(pipeline, options)`

> Execute an aggregation framework pipeline against the collection, needs MongoDB >= 2.2
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> pipeline | required | | [MongoDB.Document](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/document.html)[]
> options | {} | Options for the aggregation | [MongoDB.AggregateOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/aggregateoptions.html)
>
> returns `{ S extends object }`[]

`createIndex(spec, options)`

> Creates an index on the db and collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> spec | required | | [MongoDB.IndexSpecification](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#indexspecification)
> options | required | Options for the index creation | [MongoDB.CreateIndexesOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/createindexesoptions.html)
>
> returns Promise<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

`deleteMany(filter, options)`

> Delete multiple documents from the collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.DeleteOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/deleteoptions.html)
>
> returns Promise<[MongoDB.DeleteResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/deleteresult.html)>

`deleteOne(filter, options)`

> Delete a document from the collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.DeleteOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/deleteoptions.html)
>
> returns Promise<[MongoDB.DeleteResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/deleteresult.html)>

`distinct(key, filter, options)`

> The distinct command returns a list of distinct values for the given key across the collection.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> key | required | Distinct key of the schema | `{ T extends keyof S }`
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.CommandOperationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/commandoperationoptions.html)
>
> returns Promise<`{ S extends object }`[`{ T extends keyof S }`]\[]>

`drop(options)`

> Drop the collection from the database, removing it permanently. New accesses will create a new collection.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> options | {} | Options applied to the operation | [MongoDB.CommandOperationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/commandoperationoptions.html)
>
> returns Promise<[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>

`dropIndex(name, options)`

> Drop an index from this collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> name | required | Name of the index | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
> options | {} | Options applied to the operation | [MongoDB.CommandOperationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/commandoperationoptions.html)
>
> returns Promise<[MongoDB.Document]([MongoDB.Document](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/document.html))>

`find(filter, options)`

> Creates an array from the filter that can be used to iterate over results from MongoDB
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.FindOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoptions.html)<`{ S extends object }`>
>
> returns Promise<`{ S extends object }`[]>

`findOne(filter, options)`

> Fetches the first document that matches the filter
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.FindOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoptions.html)<`{ S extends object }`>
>
> returns Promise<`{ S extends object }`>

`findOneAndDelete(filter, options)`

> Fetches the first document that matches the filter and deletes it
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.FindOneAndDeleteOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoneanddeleteoptions.html)
>
> returns Promise<[MongoDB.ModifyResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/modifyresult.html)<`{ S extends obejct }`>>

`findOneAndReplace(replacement, filter, options, schemaOptions)`

> Fetches the first document that matches the filter and replaces it
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> replacement | required | Replacement document that is applied | `{ S extends object }`
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.FindOneAndReplaceOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoneandreplaceoptions.html)
> schemaOptions | {} | Schema options applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.ModifyResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/modifyresult.html)<`{ S extends obejct }`>>

`findOneAndUpdate(update, filter, options, schemaOptions)`

> Fetches the first document that matches the filter and updates it
> Paramter | Default | Description | Type
> -------- | ------- | ----------- | ----
> update | required | Update document that is applied | [MongoDB.UpdateFilter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#updatefilter)<`{ S extends object }`>
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.FindOneAndUpdateOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoneandupdateoptions.html)
> schemaOptions | {} | Schema options applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.ModifyResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/modifyresult.html)<`{ S extends obejct }`>>

`indexExists(filter, options)`

> Checks if one ore more indexes exist on the collection, fails on first non-existing index
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | required | String or String[] of index names | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]
> options | {} | Options applied to the operation | [MongoDB.IndexInformationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/indexinformationoptions.html)
>
> returns Promise<[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>

`indexes(options)`

> Retrieve all the indexes on the collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> options | {} | Options applied to the operation | [MongoDB.IndexInformationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/indexinformationoptions.html)
>
> returns Promise<[MongoDB.Document]([MongoDB.Document](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/document.html))>

`insertMany(insert, options, schemaOptions)`

> Inserts an array of documents into MongoDB. If documents passed in do not contain the \_id field, one will be added to each of the documents missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> insert | required | Insert document to be inserted | `{ S extends object }`[]
> options | {} | Options to be applied to the operation | [MongoDB.BulkWriteOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/bulkwriteoptions.html)
> schemaOptions | {} | Schema options to be applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.InsertManyResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/insertmanyresult.html)<`{ S extends object }`>>

`insertOne(insert, options, schemaOptions)`

> Inserts a document into MongoDB. If the document passed in does not contain the \_id field, one will be added missing it by the driver, mutating the document. This behavior can be overridden by setting the forceServerObjectId flag.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> insert | required | Insert document to be inserted | `{ S extends object }`
> options | {} | Options to be applied to the operation | [MongoDB.InsertOneOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/insertoneoptions.html)
> schemaOptions | {} | Schema options to be applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.InsertOneResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/insertoneresult.html)<`{ S extends object }`>>

`isCapped(options)`

> Returns if th ecollection is a capped collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> options | {} | Options to be applied to the operation | [MongoDB.OperationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/operationoptions.html)
>
> returns Promise<[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>

`rename(name, options)`

> Rename the collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> name | required | Name to rename the collection to | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
> options | {} | Options to be applied to the operation | [MongoDB.RenameOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/renameoptions.html)
>
> returns Promise<[Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)>

`replaceOne(replacement, filter, options, schemaOptions)`

> Replaces the first document that matches the filter
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> replacement | required | Replacement document to be used | `{ S extends object }`
> filter | {} | Filter to be applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options to be applied to the operation | [MongoDB.ReplaceOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/replaceoptions.html)
> schemaOptions | {} | Schema options to be applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.UpdateResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/updateresult.html)>

`stats(options)`

> Get all the collection statistics
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> options | {} | Options to be applied to the operation | [MongoDB.CollStatOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/collstatsoptions.html)
>
> returns Promise<[MongoDB.CollStats](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/collstats.html)>

`size(filter, option)`

> Return the size based on the filter
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> filter | {} | Filter to be applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options to be applied to the operation | [MongoDB.CountDocumentOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/countdocumentsoptions.html)
>
> returns Promise<[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>

`updateMany(update, filter, options, schemaOptions)`

> Find many documents and update them in one atomic operation. Requires a write lock for the duration of the operation.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> update | required | Update document that is applied | [MongoDB.UpdateFilter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#updatefilter)<`{ S extends object }`>
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.UpdateOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/updateoptions.html)
> schemaOptions | {} | Schema options applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.UpdateResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/updateresult.html)<`{ S extends obejct }`>>

`updateOne(update, filter, options, schemaOptions)`

> Find a document and update it in one atomic operation. Requires a write lock for the duration of the operation
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> update | required | Update document that is applied | [MongoDB.UpdateFilter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#updatefilter)<`{ S extends object }`>
> filter | {} | Filter applied to the operation | [MongoDB.Filter](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)<`{ S extends object }`>
> options | {} | Options applied to the operation | [MongoDB.UpdateOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/updateoptions.html)
> schemaOptions | {} | Schema options applied | `{ noUndefined?: boolean, noNull?: boolean, keepType?: boolean, strictMode: { strictType: boolean, strictUndefined: boolean, strictNull: boolean } }`
>
> returns Promise<[MongoDB.UpdateResult](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/updateresult.html)<`{ S extends obejct }`>>
