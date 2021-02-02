import {
  TrainingRecord,
  CategoryType,
  ClassifyResult,
  Attr,
  Classifier,
} from './topic'

export class BayesClassifier implements Classifier {
  // Laplace Smoothing
  private static readonly smoothing = 1.01

  private records: TrainingRecord[] = []

  public loadRecords(records: TrainingRecord[]): void {
    this.records = records
  }

  public get categories(): CategoryType[] {
    const acc = this.records.reduce<Set<CategoryType>>((acc, record) => {
      return acc.add(record.category)
    }, new Set())

    return [...acc]
  }

  public classify(attrs: Attr[]): ClassifyResult {
    return this.categories.reduce((acc, category) => {
      // prettier-ignore
      const categoryProbability = this.findCategoryProbability(category) + BayesClassifier.smoothing

      const result = attrs.reduce((acc, attr) => {
        const attrProbability = this.findAttrProbability(category, attr)
        if (attrProbability === 0) return acc

        acc = acc * (attrProbability + BayesClassifier.smoothing)
        return acc
      }, categoryProbability)

      acc[category] = result
      return acc
    }, {})
  }

  private findCategoryProbability(category: CategoryType): number {
    const targetLength = this.records.filter(
      (record) => record.category === category
    ).length
    const totalLength = this.records.length

    return targetLength / totalLength
  }

  private findAttrProbability(category, attr): number {
    const targetAttrCount = this.records
      .filter((record) => record.category === category)
      .reduce((acc, record) => {
        const hasTargetAttr = record.attrs.find((_attr) => _attr === attr)
        acc = hasTargetAttr ? acc + 1 : acc
        return acc
      }, 0)

    return targetAttrCount / this.records.length
  }
}
