import { expect } from 'chai'
import { FindTodoByIdUseCase } from '@/usecases/todo/find-todo-by-id/find-todo-by-id'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { type ITodoWithId } from '@/entities/interfaces/todo'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'

describe('Find todo by id', () => {
  it('should find todo by id', async () => {
    const todoId = 'thisisid'
    const todo: ITodoWithId = {
      id: todoId,
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'inprogress',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new FindTodoByIdUseCase(todoRepository)
    const result = await useCaseInstance.execute(todoId)
    expect(result.isRight()).to.equal(true)
    expect(result.value).to.deep.equal(todo)
  })
  it('should return an error when not find id', async () => {
    const todoId = 'thisisid'
    const todo: ITodoWithId = {
      id: 'anotherid',
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'inprogress',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new FindTodoByIdUseCase(todoRepository)
    const result = await useCaseInstance.execute(todoId)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).instanceOf(TodoNotFoundError)
  })
})
