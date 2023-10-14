import { expect } from 'chai'

import { InvalidTodoNameError } from '@/entities/errors/invalid-name-error'
import { TodoName } from '@/entities/todo/todo-name'
import { type Either } from '@/shared/either'

describe('Entity todo name testing', () => {
  describe('Todo name entity create method testing', () => {
    it('should create new todo name', () => {
      const todoName = 'thisisvalidname'
      const todoInstance = TodoName.create(todoName) as Either<null, TodoName>
      expect(todoInstance.isRight()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(TodoName)
      expect(todoInstance.value?.value).to.equal(todoName)
    })

    it('should return an error when todo name validation is false', () => {
      const todoName = 'ab'
      const todoInstance = TodoName.create(todoName)
      expect(todoInstance.isLeft()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(InvalidTodoNameError)
    })
  })

  describe('Todo name entity validate method testing', () => {
    it('should validate todo and return true', () => {
      const todoName = 'thisisvalidname'
      expect(TodoName.validate(todoName)).to.equal(true)
    })

    it('should return false when send todo name with length less than 3 chars', () => {
      const todoName = 'ab'
      expect(TodoName.validate(todoName)).to.equal(false)
    })

    it('should return false when send todo name with length greater than 100 chars', () => {
      const todoName = 'a'.repeat(101)
      expect(TodoName.validate(todoName)).to.equal(false)
    })

    it('should return false when name property is not a string', () => {
      const todoName = true as unknown as string
      expect(TodoName.validate(todoName)).to.equal(false)
    })
  })
})
