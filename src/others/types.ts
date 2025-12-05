// src/others/types.ts

// boolean: trueかfalseの真偽値
const isDone: boolean = false

// number: 整数・浮動小数点数
const decimal: number = 6
const hex: number = 0xf00d
const binary: number = 0b1010
const octal: number = 0o744

// string: 文字列
const color: string = 'blue'

// array: 配列
const list: number[] = [1, 2, 3]
const list2: Array<number> = [1, 2, 3] // Genericsを使った書き方

// tuple: 固定数の要素の配列。型は固定。
const x: [string, number] = ['hello', 10] // OK
// x = [10, "hello"]; // Error

// any: 型チェックをしない（非推奨）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false

// void: 何も返さない関数の戻り値の型
function warnUser(): void {
  console.log('This is my warning message')
}

// null & undefined
const u: undefined = undefined
const n: null = null

// never: 決して発生しない値の型（例: 常に例外を投げる関数）
function error(message: string): never {
  throw new Error(message)
}

try {
  console.log(isDone, decimal, hex, binary, octal, color, list, list2, x, notSure, warnUser(), u, n)
  error('This is an error') // この行をコメントアウトすると、エラーが発生しない
} catch (e) {
  console.error(e)
}
