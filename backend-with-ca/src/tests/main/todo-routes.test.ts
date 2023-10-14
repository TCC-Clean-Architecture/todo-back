import { expect } from 'chai'
import request from 'supertest'

import app from '@/main/configs/express'
import { clearCollection, connectDatabase } from '@/main/configs/mongodb'

describe('Todo routes testing', () => {
  before(async () => {
    await connectDatabase()
  })
  afterEach(async () => {
    await clearCollection('todos')
  })
  it('should create a new todo', async () => {
    const todo = {
      name: 'teste',
      description: 'this is description',
      status: 'done'
    }
    const response = await request(app).post('/todos').send(todo)
    expect(response.statusCode).to.equal(200)
    expect(response.body.content).to.deep.include(todo)
  })
  it('should find all todos', async () => {
    const todo = {
      name: 'teste',
      description: 'this is description',
      status: 'done'
    }
    await request(app).post('/todos').send(todo)
    const response = await request(app).get('/todos')
    expect(response.statusCode).to.equal(200)
    expect(response.body.content[0]).to.deep.include(todo)
  })
  it('should find one todo', async () => {
    const todo = {
      name: 'teste',
      description: 'this is description',
      status: 'done'
    }
    const insertedTodoResponse = await request(app).post('/todos').send(todo)
    const response = await request(app).get(`/todos/${insertedTodoResponse.body.content._id}`)
    expect(response.statusCode).to.equal(200)
    expect(response.body.content).to.deep.include(todo)
  })
  it('should delete one todo', async () => {
    const todo = {
      name: 'teste',
      description: 'this is description',
      status: 'done'
    }
    const insertedTodoResponse = await request(app).post('/todos').send(todo)
    const insertedId = insertedTodoResponse.body.content._id
    const response = await request(app).delete(`/todos/${insertedId}`)
    expect(response.statusCode).to.equal(200)
    expect(response.body.content._id).to.equal(insertedId)
    const exists = await request(app).get(`/todos/${insertedTodoResponse.body.content._id}`)
    expect(exists.statusCode).to.equal(400)
  })
  it('should update one todo', async () => {
    const todo = {
      name: 'teste',
      description: 'this is description',
      status: 'todo'
    }
    const todoUpdatePayload = {
      name: 'updated',
      description: 'updated',
      status: 'done'
    }
    const insertedTodoResponse = await request(app).post('/todos').send(todo)
    const insertedId = insertedTodoResponse.body.content._id
    const response = await request(app).put(`/todos/${insertedId}`).send(todoUpdatePayload)
    expect(response.statusCode).to.equal(200)
    expect(response.body.content._id).to.equal(insertedId)
    const verifyUpdate = await request(app).get(`/todos/${insertedTodoResponse.body.content._id}`)
    expect(verifyUpdate.statusCode).to.equal(200)
    expect(verifyUpdate.body.content).to.deep.include(todoUpdatePayload)
  })
})
