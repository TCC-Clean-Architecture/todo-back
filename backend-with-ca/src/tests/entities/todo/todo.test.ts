import { expect } from 'chai'

import { InvalidTodoDescriptionError, InvalidTodoNameError, InvalidTodoStatusError } from '@/entities/errors'
import { type ITodo } from '@/entities/interfaces/todo'
import { Todo } from '@/entities/todo/todo'
import { type Either } from '@/shared/either'

describe('Entity todo testing', () => {
  it('should validate todo parameters and return true', () => {
    const todo: ITodo = {
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'done',
      createdAt: new Date()
    }
    const expectedTodo = Object.assign({}, todo)
    delete expectedTodo.createdAt
    const todoInstance = Todo.create(todo) as Either<null, Todo>
    expect(todoInstance.value).to.be.instanceOf(Todo)
    expect(todoInstance.isRight()).to.equal(true)
    expect(todoInstance.value).to.deep.includes(expectedTodo)
    expect(todoInstance.value).to.has.property('createdAt')
    expect(todoInstance.value?.createdAt).to.be.instanceOf(Date)
  })
  it('should create todo instance with createdAt without send parameter', () => {
    const todo: ITodo = {
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'done'
    }
    const todoInstance = Todo.create(todo) as Either<null, Todo>
    expect(todoInstance.value).to.be.instanceOf(Todo)
    expect(todoInstance.isRight()).to.equal(true)
    expect(todoInstance.value).to.deep.include(todo)
    expect(todoInstance.value).to.has.property('createdAt')
    expect(todoInstance.value?.createdAt).to.be.instanceOf(Date)
  })
  it('should return an error for status that not satisfies enum', () => {
    const todo: ITodo = {
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'banana'
    } as unknown as ITodo
    const todoInstance = Todo.create(todo)
    expect(todoInstance.value).to.be.instanceOf(InvalidTodoStatusError)
    expect(todoInstance.isLeft()).to.equal(true)
  })
  it('should return an error for invalid name', () => {
    const todo: ITodo = {
      name: 'a',
      description: 'thisisdescription',
      status: 'done'
    } as unknown as ITodo
    const todoInstance = Todo.create(todo)
    expect(todoInstance.value).to.be.instanceOf(InvalidTodoNameError)
    expect(todoInstance.isLeft()).to.equal(true)
  })
  it('should return an error for invalid description', () => {
    const todo: ITodo = {
      name: 'thisisname',
      description: 'a',
      status: 'done'
    } as unknown as ITodo
    const todoInstance = Todo.create(todo)
    expect(todoInstance.value).to.be.instanceOf(InvalidTodoDescriptionError)
    expect(todoInstance.isLeft()).to.equal(true)
  })
})
