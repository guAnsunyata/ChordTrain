import { Classifier, Attr, Category } from '../1-basic-refactoring/category'

export class EagerClassifier extends Classifier {
  public categoryProbabilityMap = {}
  public attrInCategoryProbabilityMap = {}

  constructor() {
    super()
  }

  addRecord(attrs: Attr[], category: Category): void {
    super.addRecord(attrs, category)
  }

  // pre-computation for better performance
  setup(): void {
    // pre-computation findCategoryProbability
    this.categories.forEach((category) => {
      const count = super.findCategoryProbability(category)
      this.categoryProbabilityMap[category] = count
    })

    // pre-computation findAttrProbability
    const allAttrs = this.records.reduce<Set<Category>>((acc, record) => {
      record.attrs.forEach((attr) => acc.add(attr))
      return acc
    }, new Set())

    this.categories.forEach((category) => {
      allAttrs.forEach((attr) => {
        if (!this.attrInCategoryProbabilityMap[category]) {
          this.attrInCategoryProbabilityMap[category] = {}
        }
        // prettier-ignore
        this.attrInCategoryProbabilityMap[category][attr] = super.findAttrProbability(category, attr)
      })
    })
  }

  // override (using result map)
  findCategoryProbability(category: Category): number {
    return this.categoryProbabilityMap[category]
  }

  // override (using result map)
  findAttrProbability(category: Category, attr: Attr): number {
    return this.attrInCategoryProbabilityMap[category][attr] || 0
  }
}
