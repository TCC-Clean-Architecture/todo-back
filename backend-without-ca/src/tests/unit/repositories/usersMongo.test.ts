import { expect } from 'chai'
import sinon from 'sinon'
import { initializeRepository, usersRepository } from '../../../repositories'
import { userFactory } from '../../../factories'
import { type IUser } from '../../../interfaces'

describe('Todo repository testing', () => {
  let sandbox: sinon.SinonSandbox
  before(async () => {
    await initializeRepository('mongo')
  })
  beforeEach(async () => {
    sandbox = sinon.createSandbox()
  })
  afterEach(async () => {
    await usersRepository.deleteAll()
    sandbox.restore()
  })
  describe('create user testing', () => {
    it('should create an user', async () => {
      const user = userFactory({
        name: 'Gustavo',
        email: 'gustavo@email.com',
        password: '123456'
      }) as IUser
      const result = await usersRepository.create(user)
      const expectedResult = {
        name: user.name,
        email: user.email
      }
      expect(result).to.be.deep.include(expectedResult)
    })
  })
  describe('get user testing', () => {
    it('should get an user by email', async () => {
      const user = userFactory({
        name: 'Gustavo',
        email: 'gustavo@email.com',
        password: '123456'
      }) as IUser
      await usersRepository.create(user)
      const result = await usersRepository.getByEmail('gustavo@email.com')
      const expectedResult = {
        name: user.name,
        email: user.email
      }
      expect(result).to.be.deep.include(expectedResult)
    })
    it('should return null when not found user email', async () => {
      const result = await usersRepository.getByEmail('hiroaki@email.com')
      const expectedResult = null
      expect(result).to.be.equal(expectedResult)
    })
  })

  describe('delete all testing', () => {
    it('should return an empty array after insert user', async () => {
      const user = userFactory({
        name: 'Gustavo',
        email: 'gustavo@email.com',
        password: '123456'
      }) as IUser
      await usersRepository.create(user)
      await usersRepository.deleteAll()
      const result = await usersRepository.getByEmail('gustavo@email.com')
      expect(result).to.be.equal(null)
    })
  })
})
