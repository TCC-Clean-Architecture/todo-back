import { type Collection, type Document, MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
async function connectDatabase (): Promise<void> {
  await client.connect()
  await client.db('2do4u').command({ ping: 1 })
  console.debug('MongoDB connected')
}

function getCollection (collectionName: string): Collection<Document> {
  return client.db('2do4u').collection(collectionName)
}

async function clearCollection (collectionName: string): Promise<void> {
  await client.db('2do4u').collection(collectionName).deleteMany()
}

export {
  clearCollection,
  connectDatabase,
  getCollection
}
