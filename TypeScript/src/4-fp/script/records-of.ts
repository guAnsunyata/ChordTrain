import R from 'ramda'
import { TrainingRecord, Category, Attr } from '../types/record'

export const recordOf: RecordOf = (records, category, attr) =>
  R.filter(
    R.both(
      matchCategory(category),
      R.ifElse(R.always(attr), matchAttr(attr), R.always(true))
    ),
    records
  )

const matchCategory = (category) =>
  R.pipe(R.prop('category'), R.equals(category))
const matchAttr = (attr) => R.pipe(R.prop('attrs'), R.find(R.equals(attr)))

type RecordOf = (
  records: TrainingRecord[],
  category: Category,
  attr?: Attr
) => TrainingRecord[]
