import { curry, reduce, merge } from 'ramda'

/**
 * e.g. transformArrToMap('name', 'age', { name: 'Ted', age: 30 })
 * => { name: 'Ted', age: 30 }
 */
export const transformArrToMap = curry((keyProp, valProp, target) =>
  reduce((acc, obj) => merge({ [obj[keyProp]]: obj[valProp] }, acc), {}, target)
)
