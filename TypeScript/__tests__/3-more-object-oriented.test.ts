import main from '../src/3-more-object-oriented/main'

test('test 3-more-object-oriented.test final result', () => {
  jest.spyOn(console, 'log')
  main()

  expect(console.log).toBeCalledWith({
    easy: 2.023094827160494,
    medium: 1.855758613168724,
    hard: 1.855758613168724,
  })
  expect(console.log).toBeCalledWith({
    easy: 1.3433333333333333,
    medium: 1.5060259259259259,
    hard: 1.6884223991769547,
  })
})
