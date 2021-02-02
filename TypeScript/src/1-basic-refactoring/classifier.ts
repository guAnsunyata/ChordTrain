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

export class Classifier {
  protected records: TrainingRecord[] = []

  addRecord(attrs: Attr[], category: Category): void {
    // save
    this.records.push({ attrs, category })
  }

  get categories(): Category[] {
    const acc = this.records.reduce<Set<Category>>((acc, record) => {
      return acc.add(record.category)
    }, new Set())

    return [...acc]
  }

  findCategoryProbability(category: Category): number {
    const targetLength = this.records.filter(
      (record) => record.category === category
    ).length
    const totalLength = this.records.length

    return targetLength / totalLength
  }

  findAttrProbability(category: Category, attr: Attr): number {
    const targetAttrCount = this.records
      .filter((record) => record.category === category)
      .reduce((acc, record) => {
        const hasTargetAttr = record.attrs.find((_attr) => _attr === attr)
        acc = hasTargetAttr ? acc + 1 : acc
        return acc
      }, 0)

    return targetAttrCount / this.records.length
  }

  classify(attrs: Attr[]): Record<Category, number> {
    return this.categories.reduce((acc, category) => {
      const categoryProbability = this.findCategoryProbability(category) + 1.01

      const result = attrs.reduce((acc, attr) => {
        const attrProbability = this.findAttrProbability(category, attr)
        if (attrProbability === 0) return acc

        acc = acc * (attrProbability + 1.01)
        return acc
      }, categoryProbability)

      acc[category] = result
      return acc
    }, {})
  }
}

export type Attr = string
export type Category = string
export interface TrainingRecord {
  attrs: Attr[]
  category: Category
}
