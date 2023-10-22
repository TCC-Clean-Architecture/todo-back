import { faker } from '@faker-js/faker'
import { type ITodoInserted } from '../../interfaces'
import { ObjectId } from 'mongodb'

enum StatusAvailable {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
}
type IdType = 'mongo' | 'local'

const todoFixture = (idType?: IdType): ITodoInserted => {
  return {
    _id: idType === 'mongo' ? new ObjectId() : faker.string.uuid(),
    createdAt: new Date(),
    description: faker.lorem.text(),
    name: faker.lorem.text(),
    status: faker.helpers.enumValue(StatusAvailable)
  }
}

export {
  todoFixture
}
