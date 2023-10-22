import { chooseRepositoryByEnvironment } from '../utils/repositoryByEnvironment'
import { type ITodoRepository } from './repositoryInterfaces'

export type IRepositoriesLocale = 'memory' | 'mongo'
type IRepositoriesAvailable = 'todoRepository'

let todoRepository: ITodoRepository

async function dynamicImportRepository <T> (repositoryToUse: IRepositoriesLocale, repository: IRepositoriesAvailable): Promise<T> {
  const module = await import(`./${repositoryToUse}/${repository}`)
  return module[repository]
}

const initializeRepository = async (locale?: IRepositoriesLocale): Promise<void> => {
  todoRepository = await dynamicImportRepository<ITodoRepository>(locale ?? chooseRepositoryByEnvironment(process.env.NODE_ENV), 'todoRepository')
}
export {
  initializeRepository,
  todoRepository
}
