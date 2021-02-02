/**
 * Define an abstraction in proper level.
 */

/**
 * Describe how data would be stored
 * Define behaviors for the client regardless what classifier it use
 */
export class Topic {
  private classifier?: Classifier = undefined

  constructor(private records: TrainingRecord[]) {}

  public setClassifier(classifier: Classifier): void {
    this.classifier = classifier
    this.classifier.loadRecords(this.records)
  }

  public classify(attrs: Attr[]): ClassifyResult {
    if (!this.classifier) {
      throw new Error('Please set a classifier before classifying.')
    }

    return this.classifier.classify(attrs)
  }
}

/**
 * Define data container used through entire procedure
 */
export class TrainingRecord {
  constructor(private _attrs: Attr[], private _category: CategoryType) {}

  get attrs(): Attr[] {
    return this._attrs
  }

  get category(): CategoryType {
    return this._category
  }
}

/**
 * Define what data type and what output method should be followed by a classifier
 */
export interface Classifier {
  loadRecords(records: TrainingRecord[]): void
  classify(attrs: Attr[]): ClassifyResult
}

export type Attr = string
export type CategoryType = string
export type ClassifyResult = Record<CategoryType, number>
