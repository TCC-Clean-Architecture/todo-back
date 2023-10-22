import { expect } from 'chai'
import sinon from 'sinon'
import { initializeRepository, todoRepository } from '../../../repositories'
import { type ITodoListInserted, type ITodoList, type ITodoListBeforeInsert, type ITodoInserted } from '../../../interfaces'
import { todoFixture } from '../../fixtures/todo.fixture'
import { todoListFactory } from '../../../factories/todoList'

interface IInsertListHelper {
  todosToInsert: ITodoInserted[]
  listName?: string
}

describe('Local Todo repository testing', () => {
  let sandbox: sinon.SinonSandbox
  let clock: sinon.SinonFakeTimers
  const insertList = async ({ todosToInsert, listName }: IInsertListHelper): Promise<ITodoListInserted> => {
    const todoList: ITodoListBeforeInsert = {
      name: listName ?? 'list',
      createdAt: new Date(),
      todos: todosToInsert
    }
    const todoListCreated = await todoRepository.createTodoList(todoList)
    return todoListCreated
  }
  before(async () => {
    await initializeRepository()
  })
  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    clock = sandbox.useFakeTimers()
    await todoRepository.removeAllTodoLists()
  })
  afterEach(() => {
    clock.restore()
    sandbox.restore()
  })
  describe('getById', () => {
    it('should get one todo by id', async () => {
      const todoToInsert = todoFixture()
      const todoToInsert2 = todoFixture()
      const todoListCreated = await insertList({ todosToInsert: [todoToInsert, todoToInsert2] })

      const result = await todoRepository.getById(todoListCreated._id, todoToInsert._id)
      expect(result).to.deep.equals(todoToInsert)
    })
    it('should not find list when attempt to get a list', async () => {
      const result = await todoRepository.getById('abcde', 'abcde')
      expect(result).to.equals(null)
    })
    it('should not find todo inside of list todo list', async () => {
      const todoListCreated = await insertList({ todosToInsert: [] })
      const result = await todoRepository.getById(todoListCreated._id, 'abcde')
      expect(result).to.equals(null)
    })
  })
  describe('createTodoList', () => {
    it('should insert todo list', async () => {
      const todoList: ITodoList = {
        name: 'test1'
      }
      const todoListInstance = todoListFactory(todoList) as ITodoListBeforeInsert
      const result = await todoRepository.createTodoList(todoListInstance)
      expect(result).to.deep.include({ ...todoList, todos: [] })
      expect(result).to.have.property('_id')
    })
  })
  describe('getTodoLists', () => {
    it('should get all todo lists', async () => {
      const listInserted = await insertList({ todosToInsert: [] })

      const result = await todoRepository.getTodoLists()
      expect(result[0]).to.deep.equals({ ...listInserted, createdAt: new Date(), todos: [] })
    })
  })
  describe('getTodoListById', () => {
    it('should get todo list by id', async () => {
      const listInserted = await insertList({ todosToInsert: [] })
      const result = await todoRepository.getTodoListById(listInserted._id) as ITodoListInserted
      expect(result).to.deep.equals({ ...listInserted, createdAt: new Date(), todos: [] })
    })
    it('should not find the id', async () => {
      const result = await todoRepository.getTodoListById('abcde') as ITodoListInserted
      expect(result).to.deep.equals(null)
    })
  })
  describe('updateTodoList', () => {
    it('should update todo lists', async () => {
      const todoToInsert = todoFixture()
      const todoListCreated = await insertList({ todosToInsert: [todoToInsert] })
      await insertList({ todosToInsert: [todoToInsert] })
      const updateContent: ITodoList = {
        name: 'testUpdated'
      }
      const todoListUpdated = todoListFactory(updateContent) as ITodoListBeforeInsert
      const result = await todoRepository.updateTodoList(todoListCreated._id.toString(), todoListUpdated)
      expect(result).to.deep.include({ ...updateContent, createdAt: new Date(), todos: [] })
    })
    it('should not find todo list on update', async () => {
      const updateContent: ITodoList = {
        name: 'testUpdated'
      }
      const todoListUpdated = todoListFactory(updateContent) as ITodoListBeforeInsert
      const result = await todoRepository.updateTodoList('abcde', todoListUpdated)
      expect(result).to.equals(null)
    })
  })
  describe('removeAllTodoLists', () => {
    it('should remove all todo lists', async () => {
      const todoToInsert = todoFixture()
      await insertList({ todosToInsert: [todoToInsert] })

      const result = await todoRepository.removeAllTodoLists()
      expect(result).to.be.equal(true)
    })
  })
  describe('deleteList', () => {
    it('should delete list', async () => {
      const todoToInsert = todoFixture()
      const todoListCreated = await insertList({ todosToInsert: [todoToInsert] })
      const result = await todoRepository.deleteList(todoListCreated._id.toString())
      expect(result).to.equals(true)
    })
  })
})
