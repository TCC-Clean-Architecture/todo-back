import { expect } from 'chai'

import { InvalidTodoStatusError } from '@/entities/errors/invalid-status-error'
import { type AvailableStatus } from '@/entities/interfaces/todo'
import { TodoStatus } from '@/entities/todo/todo-status'
import { type Either } from '@/shared/either'

describe('Entity todo status testing', () => {
  describe('Todo status entity create method testing', () => {
    it('should create new todo status', () => {
      const todoStatus = 'done'
      const todoInstance = TodoStatus.create(todoStatus) as Either<null, TodoStatus>
      expect(todoInstance.isRight()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(TodoStatus)
      expect(todoInstance.value?.value).to.equal(todoStatus)
    })

    it('should return an error when todo status validation is false', () => {
      const todoStatus = 'banana' as AvailableStatus
      const todoInstance = TodoStatus.create(todoStatus)
      expect(todoInstance.isLeft()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(InvalidTodoStatusError)
    })
  })

  describe('Todo status entity validate method testing', () => {
    it('should validate enum of status name and return true', () => {
      const todoStatusDone = 'done'
      expect(TodoStatus.validate(todoStatusDone)).to.equal(true)
      const todoStatusTodo = 'todo'
      expect(TodoStatus.validate(todoStatusTodo)).to.equal(true)
      const todoStatusInProgress = 'inprogress'
      expect(TodoStatus.validate(todoStatusInProgress)).to.equal(true)
    })

    it('should validate enum of status name and return false', () => {
      const todoStatus = 'banana'
      expect(TodoStatus.validate(todoStatus)).to.equal(false)
    })
  })
})
