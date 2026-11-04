
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

function createConnection(): Promise<MongoClient> {
  const client = new MongoClient(uri!, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
  });

  return client.connect().catch((error) => {
    globalForMongo.mongoClientPromise = undefined;
    throw error;
  });
}

export const mongoClientPromise =
  globalForMongo.mongoClientPromise ?? createConnection();

globalForMongo.mongoClientPromise = mongoClientPromise;
