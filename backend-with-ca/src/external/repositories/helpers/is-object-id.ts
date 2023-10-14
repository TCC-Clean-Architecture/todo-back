import { ObjectId } from 'mongodb'

const isObjectId = (id: string): ObjectId | null => {
  if (!ObjectId.isValid(id)) {
    return null
  }
  return new ObjectId(id)
}

export { isObjectId }
