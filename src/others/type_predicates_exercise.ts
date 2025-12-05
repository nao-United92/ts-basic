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

function getValidNumbers(items: (number | null | undefined)[]): number[] {
  // `filter` を使っても、戻り値の型は `(number | null | undefined)[]` のまま推論される
  const filtered = items.filter(item => item !== null && item !== undefined);

  // そのため、後続の処理で `n` が `number` である保証がなく、コンパイルエラーになる
  // const total = filtered.reduce((sum, n) => sum + n, 0); // Error: Object is possibly 'null' or 'undefined'.

  // ここで無理やり型アサーションで解決しているが、もっと良い方法がある
  return filtered as number[];
}

const mixedNumbers = [1, 2, null, 4, undefined, 6];
const validNumbers = getValidNumbers(mixedNumbers);
console.log("Valid Numbers:", validNumbers);


// --- 課題2: Union型の配列から特定の型を抽出する ---

interface Dog {
  type: 'dog';
  name: string;
  bark(): void;
}

interface Cat {
  type: 'cat';
  name: string;
  meow(): void;
}

type Animal = Dog | Cat;

function getDogs(animals: Animal[]): Animal[] { // 戻り値の型が Animal[] のまま
  return animals.filter(animal => animal.type === 'dog');
}

const mixedAnimals: Animal[] = [
  { type: 'dog', name: 'Fido', bark: () => console.log('Woof!') },
  { type: 'cat', name: 'Whiskers', meow: () => console.log('Meow') },
  { type: 'dog', name: 'Buddy', bark: () => console.log('Woof! Woof!') },
];

const dogs = getDogs(mixedAnimals);
// `dogs` の要素は `Dog` 型だと分かっているのに、型推論ができていない
// dogs.forEach(dog => dog.bark()); // Error: Property 'bark' does not exist on type 'Animal'.


// --- 課題3: エラー応答だけをフィルタリングする ---

interface SuccessResponse<T> {
    status: 'success';
    data: T;
}

interface ErrorResponse {
    status: 'error';
    message: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function filterErrors<T>(responses: ApiResponse<T>[]): ErrorResponse[] {
  // TODO: 型述語を使って、`ErrorResponse` だけを抽出する実装をしてください
  return []; // 仮の実装
}

const apiResponses: ApiResponse<number>[] = [
    { status: 'success', data: 123 },
    { status: 'error', message: 'Not Found' },
    { status: 'error', message: 'Internal Server Error' },
    { status: 'success', data: 456 },
];

const errors = filterErrors(apiResponses);
console.log("Error Messages:", errors.map(e => e.message));
