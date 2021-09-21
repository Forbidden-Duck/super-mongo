Read [Github](https://github.com/Forbidden-Duck/super-mongo) README, in case of unpublished changes

# Super-Mongo

A custom [MongoDB](https://www.mongodb.com/) interface that has a schema interpreter. Written in JavaScipt with TypeScript support.

```
npm install super-mongo
```

[![NPM Version](https://badgen.net/npm/v/super-mongo)](https://www.npmjs.com/package/super-mongo)
[![NPM Downloads](https://badgen.net/npm/dm/super-mongo)](https://www.npmjs.com/package/super-mongo)

## **Features**

### Schema Interpretation

`Utils.Obj2Schema` will interpret the inputted schema and modify the inputted obj to follow those rules. There are options which can modify how the interpret makes modifications.

### Type Checker

`Utils.Types.checkType` is used to validate a type.

`Utils.Types.checkType2Primitives` Is able to compare primitives to one another. `""` will be interpreted as `JSString` and `{}` will be interpreted as `JSObject`. Note this only works on primitives (i.e. `JSObject` or `class` will not match against `JSObject`).

### Schema Typings

I worked tirelessly to get the typings to be as intuitive as possible while not ruining the experience. Some modifications will be made down the line to make typings a bit more intuitive on certain methods that refuse to provide any help.

### Utilities

`super-mongo` comes with utilities, including Obj2Schema so you can use it at your own free will. Along-side this are a few encryption specific utilities `Base64`, `Hash` and `Token`.

## **Getting Started**

### Connection Settings

You can use a plain string (i.e. `mongodb://username:password@address:port/host`), however, you can use an object

```ts
{
    address: string,
    host: string, // Not required
    username: string, // Not required
    password: string // Not required
}
```

### Creating a Collection

All a collection needs is it's name, schema and options. If you want more specific control the 4th parameter accepts a `MongoDB.Collection` which will immediately connect the collection.

```js
const SuperMongo = require("super-mongo");
const myUserCollection = new SuperMongo.Collection(
    "users",
    {
        _id: SuperMongo.DataTypes.Ignore, // We don't want types on _id modified
        name: SuperMongo.DataTypes.JSString,
        email: SuperMongo.DataTypes.JSString,
        age: SuperMongo.DataTypes.JSInt64,
        notes: [
            {
                title: SuperMongo.DataTypes.JSString,
                note: SuperMongo.DataTypes.JSString,
            },
        ], // The interpreter will apply schema rules to anything (including multi-dimensional arrays)
        createdAt: SuperMongo.DataTypes.JSDate,
        modifiedAt: SuperMongo.DataTypes.JSDate,
    },
    { createIfNotExist: true } // If you want to create the collection if you haven't got one already
);
```

### Creating a Database

Database takes nothing but a name, an array of collections and dbOptions (if you need it)

```js
const SuperMongo = require("super-mongo");
const myWebsiteDatabase = new SuperMongo.Database("mywebsitedb", [
    myUserCollection,
    myProductCollection,
    myAdminCollection,
]);
```

### Connecting to your MongoDB Database

Now you need to put your connecting settings and array of databases into the MongoClient

```js
const SuperMongo = require("super-mongo");
const MongoClient = await new SuperMongo.MongoClient(connectionSettings, [
    myWebsiteDatabase,
    myBusinessNameWebsite,
]).connect();
```

### Now time to use your MongoDB Database

```js
// Create my user
await myUserCollection.insertOne({
    _id: 0,
    name: "Super Mongo",
    email: "super.mongo@supermongo.supermongo",
    age: 20,
    notes: [],
    createdAt: new SuperMongo.DataTypes.JSDate(),
});
// Make sure it was created
const myUser = await myUserCollection.findOne({ _id: 0 });
if (myUser && myUser._id) console.log("Created!");
else console.log("Failed :(");
```

### Plans

`Collection.fix()` Will run a schema interpreter over the collection and it's documents. Doing so will parse data into the correct types or returns undefined (i.e. "1" = 1)

`CollectionOptions.indexes: Array` Indexes to be created if they do not exist
