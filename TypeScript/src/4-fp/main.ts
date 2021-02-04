import { classifier } from './script/classifier'

export default function main() {
  const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7']
  const somewhereOverTheRainbow = ['c', 'em', 'f', 'g', 'am']
  const tooManyCooks = ['c', 'g', 'f']
  const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm']
  const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab']
  const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6']
  const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
  const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
  const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#']

  const records = ([
    [imagine, 'easy'],
    [somewhereOverTheRainbow, 'easy'],
    [tooManyCooks, 'easy'],
    [iWillFollowYouIntoTheDark, 'medium'],
    [babyOneMoreTime, 'medium'],
    [creep, 'medium'],
    [paperBag, 'hard'],
    [toxic, 'hard'],
    [bulletproof, 'hard'],
  ] as [string[], string][]).map(([attrs, category]) => ({
    attrs,
    category,
  }))

  console.log(classifier(records)(['d', 'g', 'e', 'dm']))
  console.log(classifier(records)(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']))
}
