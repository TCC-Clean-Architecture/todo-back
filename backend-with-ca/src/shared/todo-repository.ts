import { type ICompleteTodo, type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'

export interface ITodoRepository {
  create (todo: ICompleteTodo): Promise<string>
  findById (todoId: string): Promise<ITodoWithId | null>
  findAll (): Promise<ITodoWithId[]>
  delete (todoId: string): Promise<string | null>
  update (todoId: string, content: Partial<ITodo>): Promise<string | null>
}
