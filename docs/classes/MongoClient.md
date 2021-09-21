# MongoClient

Represents the MongoDB Client

## Properties

`.connectionURL`

> Client connection URL\
> type [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

`.client`

> The MongoDB Client\
> type [MongoDB.MongoClient](https://mongodb.github.io/node-mongodb-native/4.0/classes/mongoclient.html)

`.clientOptions`

> The client options applied to the MongoDB Client\
> type [MongoDB.MongoClientOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/mongoclientoptions.html)

`.databases`

> An array of the client databases\
> type [Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md)[]

## Constructor

`new SuperMongo.MongoClient(connection, dbs, clientOptions)`

> | Parameter      | Default  | Description                 | Type                                                                                                                                                                            |
> | -------------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | connection     | required | Connection string or object | `{ address: string, host?: string, username?: string, password?: string }` \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
> | dbs            | required | Array of client databases   | [Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md)[]                                                                                |
> | clientOptions? | {}       | MongoDB MongoClient options | [MongoDB.MongoClientOptions](https://mongodb.github.io/node-mongodb-native/4.0/interfaces/mongoclientoptions.html)                                                              |

## Functions

`close(force)`

> Closes the db and its underlying connections
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> force | undefined | | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

`connect()`

> Connect to MongoDB using the connectionURl
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> returns Promise<[MongoClient]([MongoClient](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/MongoClient.md))>

`database(dbName)`

> Returns a reference to a Database
> Parameter | Default | Description | Type
> -------- | -------- | ----------- | ----
> dbName | required | The name of the database | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
>
> returns [Database](<[Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md)>)

`db(db)`

> Create a new Db instance sharing the current socket connections.
> Parameter | Default | Description | Type
> --------- | ------- | ----------- | ----
> db | required | The Database to create | [Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md)
>
> returns Promise<[Database]([Database](https://github.com/Forbidden-Duck/super-mongo/tree/master/docs/classes/Database.md))>
