enum AvailableStatusEnum {
  todo,
  inprogress,
  done
}

export type AvailableStatus = keyof typeof AvailableStatusEnum

const availableStatus = Object.values(AvailableStatusEnum)

interface ITodo {
  name: string
  description: string
  status: AvailableStatus
  createdAt?: Date
}

interface ICompleteTodo extends Required<ITodo> {

}

export interface ITodoWithId extends ICompleteTodo {
  id: string
}

export {
  availableStatus,
  type ICompleteTodo,
  type ITodo
}
