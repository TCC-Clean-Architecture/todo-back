function convertMongoIdToNormalId (item: any): any {
  const { _id, ...rest } = item
  return { id: _id.toString(), ...rest }
}

export { convertMongoIdToNormalId }
