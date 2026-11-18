import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "jontrobazar";

let client = null;
let clientPromise = null;

if (!uri || uri.includes("<username>")) {
  console.warn("⚠️ MONGO_URI is missing or unconfigured in client .env.local");
} else {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export const getMongoClient = async () => {
  if (!clientPromise) return null;
  return await clientPromise;
};

export const getMongoDb = async () => {
  const c = await getMongoClient();
  if (!c) return null;
  return c.db(dbName);
};

export default clientPromise;
