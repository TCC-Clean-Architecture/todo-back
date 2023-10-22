import { chooseRepositoryByEnvironment } from '../utils/repositoryByEnvironment'
import { type ITodoRepository, type IUsersRepository } from './repositoryInterfaces'

export type IRepositoriesLocale = 'memory' | 'mongo'
type IRepositoriesAvailable = 'todoRepository' | 'usersRepository'

let todoRepository: ITodoRepository
let usersRepository: IUsersRepository

async function dynamicImportRepository <T> (repositoryToUse: IRepositoriesLocale, repository: IRepositoriesAvailable): Promise<T> {
  const module = await import(`./${repositoryToUse}/${repository}`)
  return module[repository]
}

const initializeRepository = async (locale?: IRepositoriesLocale): Promise<void> => {
  todoRepository = await dynamicImportRepository<ITodoRepository>(locale ?? chooseRepositoryByEnvironment(process.env.NODE_ENV), 'todoRepository')
  usersRepository = await dynamicImportRepository<IUsersRepository>(locale ?? chooseRepositoryByEnvironment(process.env.NODE_ENV), 'usersRepository')
}
export {
  initializeRepository,
  todoRepository,
  usersRepository
}
