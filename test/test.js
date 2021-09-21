// Clear console for start
console.clear();
// Easy logging
function log(str, value, section) {
    console.log(`${str}:`, value);
    if (section) console.log("");
}

// asynchronous features
(async () => {
    const SuperMongo = require("../");
    // Load environment variables
    require("dotenv").config({ path: __dirname + "/./.env" });

    /**
     * @type {SuperMongo.ClientConnection}
     */
    const connection = {
        address: process.env.DBADDRESS,
        host: process.env.DBHOST,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
    };

    const userCollection = new SuperMongo.Collection(
        "users",
        {
            _id: SuperMongo.DataTypes.Ignore,
            name: {
                first: SuperMongo.DataTypes.JSString,
                last: SuperMongo.DataTypes.JSString,
            },
            age: SuperMongo.DataTypes.JSInt64,
            email: SuperMongo.DataTypes.JSString,
            notes: [
                {
                    title: SuperMongo.DataTypes.JSString,
                    value: SuperMongo.DataTypes.JSString,
                },
            ],
            createdAt: SuperMongo.DataTypes.JSDate,
            modifiedAt: SuperMongo.DataTypes.JSDate,
        },
        { createIfNotExist: true }
    );
    const testCollection = new SuperMongo.Collection(
        "test",
        {
            _id: SuperMongo.DataTypes.Ignore,
            data: {
                key: SuperMongo.DataTypes.JSString,
                value: SuperMongo.DataTypes.Ignore,
            },
        },
        { createIfNotExist: true }
    );
    const collections = [userCollection];
    const database = new SuperMongo.Database(
        process.env.ENTRYDBNAME,
        collections
    );
    const databases = [database];
    console.log("------------ Connection Settings ------------");
    log("CONNECTION", connection, true);
    const MongoClient = await new SuperMongo.MongoClient(
        connection,
        databases
    ).connect();

    // TEST CLIENT URL AND DATABASES
    console.log("------------ Client, Databases and Collections ------------");
    log("URL", MongoClient.connectionURL);
    log(
        "DATABASES",
        databases.map((db) => `${db.name} : ${db.db ? "Active" : "Inactive"}`)
    );
    log(
        "COLLECTIONS",
        collections.map(
            (coll) => `${coll.name} : ${coll.coll ? "Active" : "Inactive"}`
        ),
        true
    );

    // TEST DATABASE
    console.log("------------ Database Test ------------");
    await database.addCollection(testCollection);
    log(
        "CREATE TEST COLLECTION",
        `${testCollection.name} : ${
            testCollection.coll ? "Active" : "Inactive"
        }`
    );
    await database.removeCollection(testCollection.name);
    log(
        "DELETE TEST COLLECTION",
        `${testCollection.name} : ${
            testCollection.coll ? "Active" : "Inactive"
        }`,
        true
    );

    // TEST COLLECTION
    console.log("------------ Collection Test ------------");
    log(
        "DELETE ALL",
        `${(await userCollection.deleteMany()).deletedCount} Deleted`
    );
    log("FIND NOTHING", `${(await userCollection.find()).length} Found`);
    /**
     * @type {userCollection["schema"][]}
     */
    const insertDocuments_1 = [
        {
            _id: new SuperMongo.DataTypes.BSONObjectID(),
            age: 03,
            createdAt: new SuperMongo.DataTypes.JSDate(0),
            email: "super.mongo@supermongo.com",
            modifiedAt: new SuperMongo.DataTypes.JSDate(),
            name: {
                first: "Super",
                last: "Mongo",
            },
            notes: [{ title: "Thoughts", value: "I am mega mind" }],
        },
        {
            _id: new SuperMongo.DataTypes.BSONObjectID(),
            age: "1",
            createdAt: new SuperMongo.DataTypes.JSDate(9999999999999),
            email: "1@1.1",
            modifiedAt: null,
            name: {
                first: "1",
                last: "1",
            },
            notes: [{ title: "Thoughts", value: "I am mega mind" }],
        },
        {
            _id: new SuperMongo.DataTypes.BSONObjectID(),
            age: 2323323232425634636543654643564364356,
            createdAt: new SuperMongo.DataTypes.JSDate(0),
            email: 45645436456456456565464,
            modifiedAt: 0,
            name: {
                first: "33",
                last: "1337",
            },
            notes: [{ title: "Thoughts", value: "I am mega mind" }],
        },
    ];
    log(
        "INSERT MANY",
        `${
            (await userCollection.insertMany(insertDocuments_1)).insertedCount
        } Inserted`
    );
    const findDocument_1 = await userCollection.findOne({
        _id: insertDocuments_1[0]._id,
    });
    log(
        "FIND ONE",
        `${
            findDocument_1 &&
            SuperMongo.Utils.Types.checkType2Primitives(
                findDocument_1.name,
                SuperMongo.DataTypes.JSObject
            )
                ? `${findDocument_1.name.first} ${findDocument_1.name.last}`
                : findDocument_1._id
                ? "Found - No Name"
                : "Not Found"
        }`
    );
    const findDocuments_1 = await userCollection.find({
        $or: [
            { _id: insertDocuments_1[1]._id },
            { _id: insertDocuments_1[2]._id },
        ],
    });
    log(
        "FIND MANY",
        `${findDocuments_1.filter((doc) => doc._id).length} Found`
    );
    log(
        "UPDATE ONE",
        `${
            (
                await userCollection.updateOne(
                    { $set: { age: 20 } },
                    { _id: insertDocuments_1[0]._id }
                )
            ).modifiedCount
        } Updated`
    );
    log(
        "UPDATE MANY",
        `${
            (
                await userCollection.updateMany(
                    {
                        $set: {
                            name: {
                                first: "You were",
                                last: "HACKED!",
                            },
                        },
                    },
                    {
                        $or: [
                            { _id: insertDocuments_1[1]._id },
                            { _id: insertDocuments_1[2]._id },
                        ],
                    }
                )
            ).modifiedCount
        } Updated`,
        true
    );

    // TEST CLOSE
    try {
        await MongoClient.close();
    } catch (e) {}
    console.log("------------ Client Close ------------");
    log(
        "DB Closed",
        MongoClient.databases.map((db) =>
            db.db === null
                ? db.collections.every((coll) => !coll._coll)
                    ? [db.name, "Closed"]
                    : [db.name, "Open (Reason: Collections)"]
                : [db.name, "Open (Reason: Unknown)"]
        )
    );
})();
