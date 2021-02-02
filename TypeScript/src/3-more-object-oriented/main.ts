import { TrainingRecord, Topic } from './topic'
import { BayesClassifier } from './bayes-classifier'

// certain training data
enum CATEGORY { // CategoryType
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

// don't declare any variable we never reference
const dataSet: TrainingRecord[] = [
  new TrainingRecord(['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'], CATEGORY.EASY),
  new TrainingRecord(['c', 'em', 'f', 'g', 'am'], CATEGORY.EASY),
  new TrainingRecord(['c', 'g', 'f'], CATEGORY.EASY),
  new TrainingRecord(['f', 'dm', 'bb', 'c', 'a', 'bbm'], CATEGORY.MEDIUM),
  new TrainingRecord(['cm', 'g', 'bb', 'eb', 'fm', 'ab'], CATEGORY.MEDIUM),
  // prettier-ignore
  new TrainingRecord(['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'], CATEGORY.MEDIUM),
  // prettier-ignore
  new TrainingRecord(['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'], CATEGORY.HARD),
  // prettier-ignore
  new TrainingRecord(['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'], CATEGORY.HARD),
  new TrainingRecord(['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'], CATEGORY.HARD),
]

export default function main() {
  const topic = new Topic(dataSet)
  topic.setClassifier(new BayesClassifier())

  const result1 = topic.classify(['d', 'g', 'e', 'dm'])
  // prettier-ignore
  const result2 = topic.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'])
  console.log(result1)
  console.log(result2)
}
