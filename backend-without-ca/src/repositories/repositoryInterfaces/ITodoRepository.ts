import { type ITodoListBeforeInsert, type ITodoInserted, type ITodoListInserted, type Id } from '../../interfaces'

interface ITodoRepository {
  listAll: (listId: Id, userId: Id) => Promise<ITodoInserted[] | []>
  getById: (listId: Id, todoId: Id, userId: Id) => Promise<ITodoInserted | null>
  createTodoList: (todoListToInsert: ITodoListBeforeInsert) => Promise<ITodoListInserted>
  getTodoLists: (userId: Id) => Promise<ITodoListInserted[]>
  getTodoListById: (id: Id, userId: Id) => Promise<ITodoListInserted | null>
  updateTodoList: (id: Id, content: ITodoListBeforeInsert) => Promise<ITodoListInserted | null>
  removeAllTodoLists: () => Promise<boolean>
  deleteList: (id: Id, userId: Id) => Promise<boolean>
}

export type {
  ITodoRepository
}
