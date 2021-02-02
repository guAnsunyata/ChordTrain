import { Classifier } from './category'

export default function main() {
  const classifier = new Classifier()

  const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7']
  const somewhereOverTheRainbow = ['c', 'em', 'f', 'g', 'am']
  const tooManyCooks = ['c', 'g', 'f']
  const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm']
  const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab']
  const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6']
  // prettier-ignore
  const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
  // prettier-ignore
  const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
  const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#']

  classifier.addRecord(imagine, 'easy')
  classifier.addRecord(somewhereOverTheRainbow, 'easy')
  classifier.addRecord(tooManyCooks, 'easy')
  classifier.addRecord(iWillFollowYouIntoTheDark, 'medium')
  classifier.addRecord(babyOneMoreTime, 'medium')
  classifier.addRecord(creep, 'medium')
  classifier.addRecord(paperBag, 'hard')
  classifier.addRecord(toxic, 'hard')
  classifier.addRecord(bulletproof, 'hard')

  console.log(classifier.classify(['d', 'g', 'e', 'dm']))
  // prettier-ignore
  console.log(classifier.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']))
}
