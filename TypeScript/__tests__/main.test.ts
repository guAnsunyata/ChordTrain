import { classify } from '@/main'

test('the final output', () => {
	jest.spyOn(console, 'log');

	classify(['d', 'g', 'e', 'dm']);
	classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);

	expect(console.log).toBeCalled();
});