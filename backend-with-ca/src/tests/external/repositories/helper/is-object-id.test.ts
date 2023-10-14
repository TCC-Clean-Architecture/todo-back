import { expect } from 'chai'
import { ObjectId } from 'mongodb'

import { isObjectId } from '@/external/repositories/helpers/is-object-id'

describe('Is object id function testing', () => {
  it('should return objectid if the id is object id', () => {
    const id = new ObjectId()
    const objectIdInString = id.toString()
    const result = isObjectId(objectIdInString) as ObjectId
    expect(result).to.be.instanceOf(ObjectId)
    expect(result.toString()).to.equal(objectIdInString)
  })
  it('should return null if the id is object id', () => {
    const result = isObjectId('a')
    expect(result).to.equal(null)
  })
})
