import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const uri = await mongod.getUri();
const port = await mongod.getPort();
const dbPath = await mongod.getDbPath();
const dbName = await mongod.getDbName();

mongod.getInstanceInfo()

await mongod.stop();

mongod.getInstanceInfo();
