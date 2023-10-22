import { faker } from '@faker-js/faker'
import { type ITodoInserted } from '../../interfaces'

enum StatusAvailable {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
}

const todoFixture = (): ITodoInserted => {
  return {
    _id: faker.string.uuid(),
    createdAt: new Date(),
    description: faker.lorem.text(),
    name: faker.lorem.text(),
    status: faker.helpers.enumValue(StatusAvailable)
  }
}

export {
  todoFixture
}
