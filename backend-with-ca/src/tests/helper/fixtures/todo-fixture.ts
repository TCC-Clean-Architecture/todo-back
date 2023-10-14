import { faker } from '@faker-js/faker'

import { type ITodoWithId } from '@/entities/interfaces/todo'

enum StatusAvailable {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
}

const todoFixture = (): ITodoWithId => {
  return {
    id: faker.string.uuid(),
    createdAt: new Date('0'),
    description: faker.lorem.text(),
    name: faker.lorem.text(),
    status: faker.helpers.enumValue(StatusAvailable)
  }
}

export {
  todoFixture
}
