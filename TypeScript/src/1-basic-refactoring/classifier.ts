/**
 * Use derived attribution pattern instead of using snapshot map
 *
 * Benefits:
 * - Lazy Computation.
 * - Flexible Cache Strategy. (We can adopt eager or cache strategy to make up perf issues)
 * - Single source of truth.
 * - Avoid mutable data to clear the side-effect from behaviors.
 * - Build side-effect free & mostly pure function in given context methods (always same result when giving same records).
 */

/**
 * Remove setup method (setLabelProbabilities, setChordCountsInLabels).
 *
 * Because:
 * Classifying target after new training but just before setup process creates ambiguous result.
 * We don't want correct result is rely on calling method in right order by client.
 * Eager may create computational redundancy when given attributions is extremely sparse in this algorithm.
 */

/**
 * Remove common code JavaScript smells
 *
 * Including:
 * - Remove improper global variables.
 * - Avoid mutating data.
 * - Remove hoisting (by eliminate all var syntax)
 * - Prefer const rather than let
 * - Remove dead code
 * - Change magic number into explicit variables or functions
 * - Code Formatting (done mostly by prettier & eslint)
 */
import R from 'ramda'

const transformArrToMap = R.curry((keyProp, valProp, target) =>
  R.reduce(
    (acc, obj) => R.merge({ [obj[keyProp]]: obj[valProp] }, acc),
    {},
    target
  )
)

export class Classifier {
  protected records: TrainingRecord[] = []

  public addRecord(attrs: Attr[], category: Category): void {
    // save
    this.records.push({ attrs, category })
  }

  protected get categories(): Category[] {
    // prettier-ignore
    return R.pipe(
      R.map(R.prop('category')),
      R.uniq
    )(this.records)
  }

  protected findCategoryProbability(category: Category): number {
    const totalLength = R.length(this.records)
    const matchCategory = R.pipe(R.prop('category'), R.equals(category))

    // prettier-ignore
    const targetLength = R.pipe(
      R.filter(matchCategory),
      R.length
    )(this.records)

    return targetLength / totalLength
  }

  protected findAttrProbability(category: Category, attr: Attr): number {
    const totalLength = R.length(this.records)

    const matchCategory = R.pipe(R.prop('category'), R.equals(category))
    const matchAttr = R.pipe(R.prop('attrs'), R.find(R.equals(attr)))

    // prettier-ignore
    const matchedRecordLength = R.pipe(
      R.filter(
        R.both(matchCategory, matchAttr)
      ),
      R.length
    )(this.records)

    return matchedRecordLength / totalLength
  }

  public classify(attrs: Attr[]): Record<Category, number> {
    // accum attrs p in category
    // prettier-ignore

    // { category, probability }
    return R.pipe(
      R.map(
        (category) => {
          const categoryProbability = this.findCategoryProbability.bind(this)(category) + 1.01
          const findAttrProbabilityInCategory = R.partial(this.findAttrProbability.bind(this), [category])
          // const multi = (acc, i) => acc * i

          // R.reduce(, categoryProbability, attrs)
          const attrsP = R.pipe(
            R.map(findAttrProbabilityInCategory),
            R.reject(R.equals(0)),
            R.map(R.add(1.01))
          )(attrs)

          const probability = R.reduce(R.multiply, categoryProbability, attrsP)

          return {
            category,
            probability,
          }
        }
      ),
      transformArrToMap('category', 'probability')
    )(this.categories)
  }
}

export type Attr = string
export type Category = string
export interface TrainingRecord {
  attrs: Attr[]
  category: Category
}
