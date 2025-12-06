// src/others/type_predicates_exercise.ts

// ## 課題
// このファイルには、配列をフィルタリングするコードが含まれていますが、
// TypeScriptの型推論が不十分で、後続の処理で型安全性が損なわれる可能性があります。
// 「型述語（Type Predicates）」を使って、フィルタリング後の配列の型を
// より正確に推論させるようにリファクタリングしてみましょう。
//
// 1. **`getValidNumbers` 関数の改善**:
//    `getValidNumbers` は `(number | null | undefined)[]` の配列を受け取り、
//    `null` と `undefined` を取り除こうとします。しかし、`filter` を使っただけでは
//    戻り値の型が `(number | null | undefined)[]` のままで、絞り込まれていません。
//    `item is number` のような型述語を返す関数を `filter` に渡すことで、
//    戻り値の型が `number[]` になるように修正してみましょう。
//
// 2. **`findDog` 関数のリファクタリング**:
//    `Animal` のUnion型から `Dog` 型のオブジェクトだけを抽出したいと考えています。
//    `getDogs` 関数では `animal.type === 'dog'` というチェックをしていますが、
//    これも戻り値の型が `Animal[]` のままです。
//    `animal is Dog` という型述語を返す関数を作成し、`filter` に適用することで、
//    `Dog[]` 型を安全に取得できるようにしてみましょう。
//
// 3. **`filterErrors` 関数の実装**:
//    `ApiResponse` の配列から、エラー応答 (`ErrorResponse`) だけを抽出する
//    `filterErrors` 関数を実装してみましょう。型述語を使って、
//    戻り値が `ErrorResponse[]` となるようにしてください。

// --- 課題1: `null` や `undefined` を配列から取り除く ---
function isNumber(item: number | null | undefined): item is number {
  return item !== null && item !== undefined
}

function getValidNumbers(items: (number | null | undefined)[]): number[] {
  return items.filter(isNumber)
}

const mixedNumbers = [1, 2, null, 4, undefined, 6]
const validNumbers = getValidNumbers(mixedNumbers)
console.log('Valid Numbers:', validNumbers)

// --- 課題2: Union型の配列から特定の型を抽出する ---

interface Dog {
  type: 'dog'
  name: string
  bark(): void
}

interface Cat {
  type: 'cat'
  name: string
  meow(): void
}

type Animal = Dog | Cat

function isDog(animal: Animal): animal is Dog {
  return animal.type === 'dog'
}

function getDogs(animals: Animal[]): Dog[] {
  return animals.filter(isDog)
}

const mixedAnimals: Animal[] = [
  { type: 'dog', name: 'Fido', bark: () => console.log('Woof!') },
  { type: 'cat', name: 'Whiskers', meow: () => console.log('Meow') },
  { type: 'dog', name: 'Buddy', bark: () => console.log('Woof! Woof!') },
]

const dogs = getDogs(mixedAnimals)
dogs.forEach((dog) => dog.bark())

// --- 課題3: エラー応答だけをフィルタリングする ---

interface SuccessResponse<T> {
  status: 'success'
  data: T
}

interface ErrorResponse {
  status: 'error'
  message: string
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

function isErrorResponse<T>(response: ApiResponse<T>): response is ErrorResponse {
  return response.status === 'error'
}

function filterErrors<T>(responses: ApiResponse<T>[]): ErrorResponse[] {
  return responses.filter(isErrorResponse)
}

const apiResponses: ApiResponse<number>[] = [
  { status: 'success', data: 123 },
  { status: 'error', message: 'Not Found' },
  { status: 'error', message: 'Internal Server Error' },
  { status: 'success', data: 456 },
]

const errors = filterErrors(apiResponses)
console.log(
  'Error Messages:',
  errors.map((e) => e.message),
)
