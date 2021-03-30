const sut = require("./index"); // system under test (테스트 대상 시스템)
const faker = require("faker");

// 공백 2개 -> 1개 test case
// test('sut transforms "hello  world" to "hello world"', () => {
//     const actual = sut("hello  world");
//     expect(actual).toBe("hello world");
// });
// 공백 4개 -> 1개 test case
// test('sut transforms "hello    world" to "hello world"', () => {
//     const actual = sut("hello    world");
//     expect(actual).toBe("hello world");
// });
// 공백 3개 -> 1개 test case
// test('sut transforms "hello   world" to "hello world"', () => {
//     const actual = sut("hello   world");
//     expect(actual).toBe("hello world");
// });

// 위 테스트의 반복을 피하기위해 아래 테스트를 작성한다.

// 해당 코드의 문제
// 1. 문제 발생 시 발생 시점의 입력을 찾기가 어렵다.
// 2. 문제 발생 시 발생 이후의 test-case를 실행하지 않는다.

// test('sut correctly works', () => {
//     for (const source of ['hello  world', 'hello   world', 'hello    world']) {
//         const actual = sut(source);
//         expect(actual).toBe("hello world");
//     }
// });

// 위 문제를 해결하기 위한 기법: parameterize
test.each`
  source                 | expected
  ${"hello  world"}      | ${"hello world"}
  ${"hello   world"}     | ${"hello world"}
  ${"hello    world"}    | ${"hello world"}
  ${"hello     world"}   | ${"hello world"}
  ${"hello      world"}  | ${"hello world"}
  ${"hello       world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
  const actual = sut(source);
  expect(actual).toBe(expected);
});

test.each`
  source             | expected
  ${"hello\t world"} | ${"hello world"}
  ${"hello \tworld"} | ${"hello world"}
`(
  'sut transforms "$source" that contains tab to "$expected"',
  ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
  }
);

test.each`
  source | bannedWords | expected
  ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
  ${"hello purist"} | ${["mockist", "purist"]} | ${"hello ******"}
`(
  'sut transforms "$source" to "$expected"',
  ({ source, bannedWords, expected }) => {
    const actual = sut(source, { bannedWords });
    expect(actual).toBe(expected);
  }
);

describe('given banned word', () => {
    const bannedWord = faker.lorem.word();
    const source = "hello " + bannedWord;
    const expected = "hello " + "*".repeat(bannedWord.length);

    test(`"${bannedWord}" when invoke sut then it returns "${expected}"`, () => {
        const actual = sut(source, { bannedWords : [bannedWord]});
        expect(actual).toBe(expected);
    })
});