import { type ObjectId } from 'mongodb'

import { type ICompleteTodo, type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'
import { convertMongoIdToNormalId } from '@/external/repositories/helpers/convertMongoIdToNormalId'
import { getCollection } from '@/main/configs/mongodb'
import { type ITodoRepository } from '@/shared/todo-repository'

import { isObjectId } from './helpers/is-object-id'

interface ITodoWithMongoId extends ICompleteTodo {
  _id: ObjectId
}

class MongoTodoRepository implements Partial<ITodoRepository> {
  async create (todo: ICompleteTodo): Promise<string> {
    const todoCollection = getCollection('todos')
    const { insertedId } = await todoCollection.insertOne(todo)
    return insertedId.toString()
  }

  async findById (todoId: string): Promise<ITodoWithId | null> {
    const todoCollection = getCollection('todos')
    const _id = isObjectId(todoId)
    if (!_id) {
      return null
    }
    const todo = await todoCollection.findOne({
      _id
    })
    if (!todo) {
      return null
    }

    return convertMongoIdToNormalId(todo)
  }

  async findAll (): Promise<ITodoWithId[]> {
    const todoCollection = getCollection('todos')
    const result = await todoCollection.find().toArray() as ITodoWithMongoId[]
    return result.map(item => convertMongoIdToNormalId(item))
  }

  async delete (todoId: string): Promise<string | null> {
    const todoCollection = getCollection('todos')
    const _id = isObjectId(todoId)
    if (!_id) {
      return null
    }
    const { deletedCount } = await todoCollection.deleteOne({
      _id
    })
    if (!deletedCount) {
      return null
    }
    return todoId
  }

  async update (todoId: string, content: Partial<ITodo>): Promise<string | null> {
    const todoCollection = getCollection('todos')
    const _id = isObjectId(todoId)
    if (!_id) {
      return null
    }
    const updated = await todoCollection.updateOne({
      _id
    }, {
      $set: content
    })
    if (!updated.matchedCount) {
      return null
    }
    return todoId
  }
}

export { MongoTodoRepository }
