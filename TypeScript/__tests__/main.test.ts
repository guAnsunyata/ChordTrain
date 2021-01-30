import { classify, CategoryAttrCountMap } from '@/main'

test('the final output', () => {
	jest.spyOn(console, 'log');

	classify(['d', 'g', 'e', 'dm']);
	// expect(console.log).toBeCalledWith({
	// 	easy: 2.023094827160494,
	// 	medium: 1.855758613168724,
	// 	hard: 1.855758613168724
	// });

	// classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
	// expect(console.log).toBeCalledWith({
	// 	easy: 1.3433333333333333,
	// 	medium: 1.5060259259259259,
	// 	hard: 1.6884223991769547
	// });
});

let categoryAttrCountMap
beforeAll(() => {
	categoryAttrCountMap = new CategoryAttrCountMap()
})

// test('test categoryAttrCountMap addRecord', () => {
// 	categoryAttrCountMap = new CategoryAttrCountMap()
// 	categoryAttrCountMap.addRecord(['c', 'cmaj7'], 'easy')

// 	expect(categoryAttrCountMap.getMap()).toEqual({
// 		easy: {
// 			c: 1,
// 			cmaj7: 1,
// 		}
// 	});

// 	categoryAttrCountMap.addRecord(['c', 'cmsus4', 'cm6'], 'easy')
// 	expect(categoryAttrCountMap.getMap()).toEqual({
// 		easy: {
// 			c: 2,
// 			cmaj7: 1,
// 			cmsus4: 1,
// 			cm6: 1,
// 		}
// 	});

// 	categoryAttrCountMap.addRecord(['c', 'cmsus4'], 'medium')
// 	categoryAttrCountMap.addRecord([ 'f#', 'cmsus4'], 'medium')
// 	expect(categoryAttrCountMap.getMap()).toEqual({
// 		easy: {
// 			c: 2,
// 			cmaj7: 1,
// 			cmsus4: 1,
// 			cm6: 1,
// 		},
// 		medium: {
// 			c: 1,
// 			cmsus4: 2,
// 			'f#': 1,
// 		},
// 	});
// })

test('test categoryAttrCountMap probabilityMap', () => {
	var imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
	var somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
	var tooManyCooks = ['c', 'g', 'f'];
	var iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
	var babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
	var creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
	var army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
	var paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
	var toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
	var bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

	categoryAttrCountMap.addRecord(imagine, 'easy');
	categoryAttrCountMap.addRecord(somewhere_over_the_rainbow, 'easy');
	categoryAttrCountMap.addRecord(tooManyCooks, 'easy');
	categoryAttrCountMap.addRecord(iWillFollowYouIntoTheDark, 'medium');
	categoryAttrCountMap.addRecord(babyOneMoreTime, 'medium');
	categoryAttrCountMap.addRecord(creep, 'medium');
	categoryAttrCountMap.addRecord(paperBag, 'hard');
	categoryAttrCountMap.addRecord(toxic, 'hard');
	categoryAttrCountMap.addRecord(bulletproof, 'hard');

	const map = categoryAttrCountMap.getMap()
	// console.log('map', map)
	const probabilityMap = categoryAttrCountMap.getProbabilityMap()
	// console.log('probabilityMap', probabilityMap)
	const labelProbabilityMap = categoryAttrCountMap.getCategoryProbabilityMap();
	console.log('getLabelProbabilityMap', labelProbabilityMap)
	categoryAttrCountMap.classify(['d', 'g', 'e', 'dm'])


})
