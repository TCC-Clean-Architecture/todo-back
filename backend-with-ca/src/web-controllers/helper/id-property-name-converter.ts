interface IObjectWithId {
  id: string
  [key: string]: any
}

interface IObjectWith_Id {
  _id: string
  [key: string]: any
}

const idConverter = (objWithId: IObjectWithId): IObjectWith_Id => {
  const { id, ...rest } = objWithId
  return {
    _id: id,
    ...rest
  }
}

export { idConverter }
