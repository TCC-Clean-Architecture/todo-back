import { expect } from 'chai'

import { idConverter } from '@/web-controllers/helper/id-property-name-converter'

describe('Id property name converter testing', () => {
  it('should convert a object property named as id to _id', () => {
    const objToConvert = {
      id: 'thisisid',
      property1: 'thisisproperty',
      property2: 'thisisproperty'
    }
    const convertedObj = idConverter(objToConvert)
    expect(convertedObj).has.property('_id')
    expect(convertedObj._id).to.equal(objToConvert.id)
    expect(convertedObj.property1).to.equal(objToConvert.property1)
    expect(convertedObj.property2).to.equal(objToConvert.property2)
  })
})
