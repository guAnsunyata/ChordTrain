import {
  length,
  pipe,
  map,
  prop,
  uniq,
  curry,
  reject,
  equals,
  add,
  reduce,
  multiply,
  partial,
} from 'ramda'
import { recordOf as _recordOf } from './records-of'
import { TrainingRecord, Attr, Category } from '../types/record'
import { transformArrToMap } from '../utils'

export const classifier: Classifier = (records) => curry(classify)(records)

const classify: Classify = (records, attrs) => {
  const smooth = 1.01
  const categories = pipe(map(prop('category')), uniq)(records)
  const recordOf = partial(_recordOf)([records])

  // main
  return pipe(
    map((category) => {
      const categoryProbability = length(recordOf(category)) / length(records)
      const findAttrProbability = (attr) =>
        length(recordOf(category, attr)) / length(records)

      const attrProbabilities = pipe(
        map(findAttrProbability),
        reject(equals(0)),
        map(add(smooth))
      )(attrs)

      const probability = reduce(
        multiply,
        categoryProbability + smooth,
        attrProbabilities
      )

      return { category, probability }
    }),
    transformArrToMap('category', 'probability')
  )(categories)
}

type Classify = (
  records: TrainingRecord[],
  attrs: Attr[]
) => Record<Category, number>

type Classify1 = (attrs: Attr[]) => Record<Category, number>

type Classifier = (records: TrainingRecord[]) => Classify1
