import { expect } from 'chai'
import { todoFactory } from '../../../factories'
import { initializeRepository, todoRepository } from '../../../repositories'
import { type ITodoBeforeInsert, type ITodoBase } from '../../../interfaces'
import { todoFixture } from '../../fixtures/todo.fixture'

describe('Todo repository testing', () => {
  beforeEach(async () => {
    await todoRepository.removeAll()
  })
  describe('Local repository', () => {
    before(async () => {
      await initializeRepository('memory')
    })
    it('should create todo', async () => {
      const todoToTest: ITodoBase = {
        name: 'test1',
        description: 'this is a description',
        status: 'done'
      }
      const todoInstance = todoFactory(todoToTest) as ITodoBeforeInsert
      const result = await todoRepository.create(todoInstance)
      expect(result).to.deep.include(todoInstance)
      expect(result).to.have.property('_id')
    })
    it('should list all todo', async () => {
      const todo = todoFixture()
      await todoRepository.create(todo)
      await todoRepository.create(todo)
      const result = await todoRepository.listAll()
      expect(result).to.deep.equals([todo, todo])
    })
    it('should remove all todo', async () => {
      const todo = todoFixture()
      await todoRepository.create(todo)
      await todoRepository.create(todo)
      await todoRepository.removeAll()
      const result = await todoRepository.listAll()
      expect(result).to.deep.equals([])
    })
    it('should get one todo by id', async () => {
      const todo = todoFixture()
      const todo2 = todoFixture()
      await todoRepository.create(todo)
      await todoRepository.create(todo2)

      const result = await todoRepository.getById(todo._id)
      expect(result).to.deep.equals(todo)
    })
  })
  describe('Mongo repository', () => {
    before(async () => {
      await initializeRepository('mongo')
    })

    it('should create todo', async () => {
      const todoToTest: ITodoBase = {
        name: 'test1',
        description: 'this is a description',
        status: 'done'
      }
      const todoInstance = todoFactory(todoToTest) as ITodoBeforeInsert
      const result = await todoRepository.create(todoInstance)
      expect(result).to.deep.include(todoInstance)
      expect(result).to.have.property('_id')
    })
    it('should list all todo', async () => {
      const todo1 = todoFixture('mongo')
      const todo2 = todoFixture('mongo')
      await todoRepository.create(todo1)
      await todoRepository.create(todo2)
      const result = await todoRepository.listAll()
      expect(result).to.deep.equals([todo1, todo2])
    })
    it('should remove all todo', async () => {
      const todo1 = todoFixture('mongo')
      const todo2 = todoFixture('mongo')
      await todoRepository.create(todo1)
      await todoRepository.create(todo2)
      await todoRepository.removeAll()
      const result = await todoRepository.listAll()
      expect(result).to.deep.equals([])
    })
    it('should get one todo by id', async () => {
      const todo = todoFixture('mongo')
      const todo2 = todoFixture('mongo')
      await todoRepository.create(todo)
      await todoRepository.create(todo2)

      const result = await todoRepository.getById(todo._id)
      expect(result).to.deep.equals(todo)
    })
  })
})
