import { expect } from 'chai'

import { InvalidTodoDescriptionError } from '@/entities/errors/invalid-description-error'
import { TodoDescription } from '@/entities/todo/todo-description'
import { type Either } from '@/shared/either'

describe('Entity todo description testing', () => {
  describe('Todo description entity create method testing', () => {
    it('should create new todo description', () => {
      const todoDescription = 'thisisvalidname'
      const todoInstance = TodoDescription.create(todoDescription) as Either<null, TodoDescription>
      expect(todoInstance.isRight()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(TodoDescription)
      expect(todoInstance.value?.value).to.equal(todoDescription)
    })

    it('should return an error when todo description validation is false', () => {
      const todoDescription = 'a'
      const todoInstance = TodoDescription.create(todoDescription)
      expect(todoInstance.isLeft()).to.equal(true)
      expect(todoInstance.value).to.be.instanceOf(InvalidTodoDescriptionError)
    })
  })

  describe('Todo description entity validate method testing', () => {
    it('should validate todo and return true', () => {
      const todoDescription = 'thisisvalidname'
      expect(TodoDescription.validate(todoDescription)).to.equal(true)
    })

    it('should return false when send todo description with length less than 2 chars', () => {
      const todoDescription = 'a'
      expect(TodoDescription.validate(todoDescription)).to.equal(false)
    })

    it('should return false when send todo description with length greater than 256 chars', () => {
      const todoName = 'a'.repeat(257)
      expect(TodoDescription.validate(todoName)).to.equal(false)
    })

    it('should return false when name property is not a string', () => {
      const todoName = true as unknown as string
      expect(TodoDescription.validate(todoName)).to.equal(false)
    })
  })
})
