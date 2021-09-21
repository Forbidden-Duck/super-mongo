# Database

Represents the MongoDB Database

## Properties

`.name`

> Name of the database\
> type [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

`.db`

> Reference to the MongoDB Database\
> type [MongoDB.Db](https://mongodb.github.io/node-mongodb-native/4.0/classes/db.html)

`.collections`

> An array of Database collections\
> type [Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)

`.dbOptions`

> Options used on the MongoDB Database\
> type [MongoDB.DbOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/dboptions.html)

## Constructor

`new SuperMongo.Database(name, collections, dbOptions)`

> | Parameter   | Default  | Description                          | Type                                                                                                 |
> | ----------- | -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
> | name        | required | Name of the database                 | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)    |
> | collections | required | Array of Database collections        | [Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)[] |
> | dbOptions   | {}       | Options to apply to MongoDB Database | [MongoDB.DbOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/dboptions.html)     |

## Functions

`init(db)`

> Initialise the database
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> db | required | | [MongoDB.Db](https://mongodb.github.io/node-mongodb-native/4.0/classes/db.html)
>
> returns Promise<[Database]([Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md))>

`collection(collName)`

> Returns a reference to a Collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> collName | required | Name of the Collection | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
>
> returns [Collection](<[Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)>)

`addCollection(coll)`

> Add a collection to the database
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> coll | required | Collection to add | [Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)
>
> returns Promise<[Collection]([Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md))[]> | [Collection](<[Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)>)[]

`removeCollection(collName, options)`

> Remove a collection from the database
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> collName | required | Collection reference or name to remove | [Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
> options | {} | Options for the removal | [MongoDB.CommandOperationOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/commandoperationoptions.html)
>
> returns Promise<[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>

`renameCollection(collName, newCollName, options)`

> Rename a collection
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> collName | required | Current name of the collection | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
> newCollName | required | New name of the collection | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
> options | {} | Options for the rename | [MongoDB.RenameOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/renameoptions.html)
>
> returns Promise<[Collection](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Collection.md)>
