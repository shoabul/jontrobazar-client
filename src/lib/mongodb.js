
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "jontrobazar";

if (!uri || uri.includes("<username>")) {
  throw new Error("MONGO_URI is missing or invalid");
}

const globalForMongo = globalThis;

// Reuse the same MongoClient across warm runtime instances
const client =
  globalForMongo._mongoClient ||
  new MongoClient(uri);

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = client;
}

export const db = client.db(dbName);

const getClientPromise = () => {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = client.connect().catch((error) => {
      // Allow a future request to retry the connection
      globalForMongo._mongoClientPromise = null;
      globalForMongo._mongoClient = null;

      throw error;
    });
  }

  return globalForMongo._mongoClientPromise;
};

export const getMongoClient = async () => {
  return await getClientPromise();
};

export const getMongoDb = async () => {
  await getClientPromise();
  return db;
};

export default getClientPromise();
