import * as yup from 'yup'
import { type ITodoBase, type ITodoBeforeInsert } from '../interfaces'

const yupValidation = yup.object({
  name: yup.string().min(1).required(),
  description: yup.string().min(1).required(),
  status: yup.string().oneOf(['todo', 'inprogress', 'done']).required()
})

const todoFactory = (todoItem: ITodoBase): ITodoBeforeInsert | Error => {
  try {
    yupValidation.validateSync(todoItem)
    return {
      name: todoItem.name,
      description: todoItem.description,
      status: todoItem.status,
      createdAt: new Date()
    }
  } catch (err: any) {
    return new Error(`Error on create todo instance: ${err.errors.join(' | ')}`)
  }
}

export { todoFactory }
