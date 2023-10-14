import { expect } from 'chai'
import { ObjectId } from 'mongodb'

import { type ICompleteTodo, type ITodo } from '@/entities/interfaces/todo'
import { MongoTodoRepository } from '@/external/repositories/MongoTodoRepository'
import { clearCollection, connectDatabase } from '@/main/configs/mongodb'

describe('Mongo todo repository testing', () => {
  before(async () => {
    await connectDatabase()
  })
  afterEach(async () => {
    await clearCollection('todos')
  })
  describe('Create method testing', () => {
    it('should create todo', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.create({
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      })
      expect(result).to.be.a('string')
    })
  })

  describe('findAll method testing', () => {
    it('should find all todos', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const todo: ICompleteTodo = {
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      }
      await repositoryInstance.create(todo)
      const result = await repositoryInstance.findAll()

      expect(result[0]).to.deep.include({
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      })
      expect(result[0]).to.have.property('id')
      expect(result[0].id).to.be.a('string')
    })
  })

  describe('find by id method testing', () => {
    it('should find one todo by id', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const todo: ICompleteTodo = {
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      }
      const insertedId = await repositoryInstance.create(todo)
      const result = await repositoryInstance.findById(insertedId)

      expect(result).to.deep.include({
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      })
      expect(result).to.have.property('id')
      expect(result?.id).to.be.a('string')
    })
    it('should find one and not find', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.findById(new ObjectId().toString())
      expect(result).to.equal(null)
    })
    it('should return null when send something that is not object id as parameter', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.findById('abc')
      expect(result).to.equal(null)
    })
  })

  describe('delete repository testing', () => {
    it('should remove one todo', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const todo: ICompleteTodo = {
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      }
      const insertedId = await repositoryInstance.create(todo)
      const result = await repositoryInstance.delete(insertedId)
      expect(result).to.equal(insertedId)
      const verifyDb = await repositoryInstance.findAll()
      expect(verifyDb).to.deep.equal([])
    })
    it('should not find todo to delete', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.delete(new ObjectId().toString())
      expect(result).to.equal(null)
    })
    it('should return null when send something that is not object id as parameter', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.delete('abc')
      expect(result).to.equal(null)
    })
  })

  describe('update repository testing', () => {
    it('should update one todo', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const todo: ICompleteTodo = {
        name: 'test',
        description: 'testdescription',
        status: 'done',
        createdAt: new Date('0')
      }
      const insertedId = await repositoryInstance.create(todo)
      const todoUpdatePayload: ITodo = {
        name: 'updated',
        description: 'updated',
        status: 'inprogress'
      }
      const result = await repositoryInstance.update(insertedId, todoUpdatePayload)
      expect(result).to.equal(insertedId)
      const verifyDb = await repositoryInstance.findById(insertedId)
      expect(verifyDb).to.deep.include(todoUpdatePayload)
    })
    it('should not find todo to update', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.update(new ObjectId().toString(), {})
      expect(result).to.equal(null)
    })
    it('should return null when send something that is not object id as parameter', async () => {
      const repositoryInstance = new MongoTodoRepository()
      const result = await repositoryInstance.update('abc', {})
      expect(result).to.equal(null)
    })
  })
})
