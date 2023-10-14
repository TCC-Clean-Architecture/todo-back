import { expect } from 'chai'

import { type ICompleteTodo, type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'

describe('In memory todo repository testing', () => {
  describe('Create method testing', () => {
    it('should create a new todo on repository', async () => {
      const todo: ICompleteTodo = {
        name: 'thisisname',
        description: 'thisisdescription',
        status: 'todo',
        createdAt: new Date()
      }
      const repository = new InMemoryTodoRepository([])
      const createdId = await repository.create(todo)
      const result = await repository.findById(createdId)
      expect(result).to.deep.include({
        ...todo
      })
      expect(result).to.have.property('id')
      expect(result).to.have.property('createdAt')
      expect(result?.createdAt).to.instanceOf(Date)
    })
  })
  describe('Find by id method testing', () => {
    it('should create a new todo on repository', async () => {
      const todo: ICompleteTodo = {
        name: 'thisisname',
        description: 'thisisdescription',
        status: 'todo',
        createdAt: new Date()
      }
      const repository = new InMemoryTodoRepository([])
      await repository.create(todo)
      const result = await repository.findById('notexistingid')
      expect(result).to.equal(null)
    })
  })
  describe('Find all method testing', () => {
    it('should list all todos', async () => {
      const todo: ITodoWithId = {
        id: 'thisisid',
        name: 'thisisname',
        description: 'thisisdescription',
        status: 'todo',
        createdAt: new Date()
      }
      const repository = new InMemoryTodoRepository([todo])
      const result = await repository.findAll()
      expect(result).to.deep.equal([todo])
    })
    it('should return empty result', async () => {
      const repository = new InMemoryTodoRepository([])
      const result = await repository.findAll()
      expect(result).to.deep.equal([])
    })
  })
  describe('Delete method testing', () => {
    it('should delete one todo', async () => {
      const todo: ITodoWithId = {
        id: 'thisisid',
        name: 'thisisname',
        description: 'thisisdescription',
        status: 'todo',
        createdAt: new Date()
      }
      const repository = new InMemoryTodoRepository([todo])
      const result = await repository.delete(todo.id)
      expect(result).to.equal(todo.id)
      const validateId = await repository.findAll()
      expect(validateId).to.deep.equal([])
    })
    it('should return null when cannot delete', async () => {
      const repository = new InMemoryTodoRepository([])
      const result = await repository.delete('abc')
      expect(result).to.equal(null)
    })
  })
  describe('Update method testing', () => {
    it('should update one todo', async () => {
      const todo: ITodoWithId = {
        id: 'thisisid',
        name: 'thisisname',
        description: 'thisisdescription',
        status: 'todo',
        createdAt: new Date()
      }
      const todoUpdate: ITodo = {
        name: 'dataupdated',
        description: 'dataupdated',
        status: 'inprogress'
      }
      const repository = new InMemoryTodoRepository([todo])
      const result = await repository.update(todo.id, todoUpdate)
      const expectedResult = {
        id: todo.id,
        ...todoUpdate,
        createdAt: todo.createdAt
      }
      expect(result).to.equal(todo.id)
      const validateId = await repository.findAll()
      expect(validateId).to.deep.equal([expectedResult])
    })
  }
  )
})
