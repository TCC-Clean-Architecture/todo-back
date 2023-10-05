import sinon from 'sinon'
import { type IUser } from '../../../interfaces'
import { usersService } from '../../../services/usersService'
import { initializeRepository, usersRepository } from '../../../repositories'
import { type IUsersRepository } from '../../../repositories/repositoryInterfaces'
import { assert } from 'chai'
import { userFixture } from '../../fixtures/user.fixture'

describe('Users service testing', () => {
  let sandbox: sinon.SinonSandbox
  before(async () => {
    await initializeRepository()
  })
  beforeEach(async () => {
    sandbox = sinon.createSandbox()
  })
  afterEach(async () => {
    sandbox.restore()
    await usersRepository.deleteAll()
  })
  const stubUsersRepository: IUsersRepository = {
    create: async (user) => userFixture({ _id: 'thisisid', ...user }),
    getByEmail: async () => null,
    deleteAll: async () => {}
  }
  it('should register an user correctly', async () => {
    const user: IUser = {
      name: 'Gustavo',
      email: 'gustavo@email.com',
      password: '123456'
    }
    const createRepositoryStub = sandbox.stub(usersRepository, 'create').callsFake(stubUsersRepository.create)
    const result = await usersService.register(user)
    assert.isTrue(createRepositoryStub.calledOnceWithExactly(user))
    const expectedResult = {
      statusCode: 200,
      description: 'User created successfully',
      content: {
        _id: 'thisisid',
        name: 'Gustavo',
        email: 'gustavo@email.com'
      }
    }
    assert.deepEqual(result, expectedResult)
  })
  it('should not create if user already exists', async () => {
    const user: IUser = {
      name: 'Gustavo',
      email: 'gustavo@email.com',
      password: '123456'
    }
    sandbox.stub(usersRepository, 'getByEmail').callsFake(async () => userFixture({}))
    const result = await usersService.register(user)
    const expectedResult = {
      statusCode: 400,
      content: {
      },
      description: 'User already exists'
    }
    assert.deepEqual(result, expectedResult)
  })
  it('should return an error on attempt to create user', async () => {
    const user: IUser = {
      name: 'Gustavo',
      email: 'gustavo@email.com',
      password: '123456'
    }
    const createRepositoryStub = sandbox.stub(usersRepository, 'create').callsFake(async () => null)
    const result = await usersService.register(user)
    assert.isTrue(createRepositoryStub.calledOnceWithExactly(user))
    const expectedResult = {
      statusCode: 500,
      content: {
      },
      description: 'Could not create user, database error'
    }
    assert.deepEqual(result, expectedResult)
  })
})
