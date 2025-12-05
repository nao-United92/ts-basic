// src/others/generics_constraints.ts

// ## 課題
// このファイルにはジェネリクスを使った関数が含まれていますが、型安全性が不十分な箇所や、
// より意図を明確にするための改善の余地があります。ジェネリクスの型制約（constraints）を
// 使って、これらの関数をより堅牢にリファクタリングしてみましょう。
//
// 1. **`getProperty` 関数の型安全性**:
//    この関数はオブジェクト `obj` とプロパティ名 `key` を受け取り、そのプロパティの値を返します。
//    しかし、`key` が `obj` に実際に存在するプロパティであることを型レベルで保証できていません。
//    `keyof` を使った型制約を `K` に追加して、`K` が `T` のキーであることを保証するように修正してみましょう。
//
// 2. **`mergeObjects` 関数の戻り値**:
//    `mergeObjects` は2つのオブジェクトをマージしますが、戻り値の型が `any` になっています。
//    これではマージ後のオブジェクトのプロパティが型安全に扱えません。
//    Intersection型 (`&`) とジェネリクスを組み合わせて、`T & U` という正確な戻り値の型を
//    返すように修正してみましょう。
//
// 3. **`findLongest` 関数の制約の追加**:
//    この関数は、`items` 配列の中で最も `length` が長い要素を見つけることを意図しています。
//    しかし、ジェネリック型 `T` には `length` プロパティが存在する保証がありません。
//    `extends` キーワードを使って、`T` が `{ length: number }` という構造を持つ型に限定されるように
//    型制約を追加してみましょう。これにより、`item.length` のアクセスが型安全になります。

// --- 課題1: オブジェクトのプロパティに安全にアクセスする ---

function getProperty<T, K extends string>(obj: T, key: K): any { // KがTのキーである保証がない
  return obj[key as keyof T]; // 無理やり型アサーションで解決している
}

const user = {
  name: "Alice",
  age: 30,
};

const userName = getProperty(user, "name");
console.log(`Name: ${userName}`);

// この呼び出しはコンパイルエラーになるべきだが、現状では通ってしまう
// const userEmail = getProperty(user, "email");
// console.log(`Email: ${userEmail}`);


// --- 課題2: 2つのオブジェクトをマージする ---

function mergeObjects<T, U>(obj1: T, obj2: U): any { // 戻り値が any
  return { ...obj1, ...obj2 };
}

const objA = { a: 1, b: "hello" };
const objB = { c: true, d: [1, 2, 3] };

const merged = mergeObjects(objA, objB);
// merged.a や merged.c にアクセスしたいが、型安全ではない
console.log(merged);


// --- 課題3: `length` プロパティを持つ要素を扱う ---

function findLongest<T>(items: T[]): T | null {
  if (items.length === 0) {
    return null;
  }

  let longest = items[0];
  for (let i = 1; i < items.length; i++) {
    // T に .length がある保証がないため、コンパイルエラーになるはず
    // if (items[i].length > longest.length) {
    //   longest = items[i];
    // }
  }
  return longest;
}

// 文字列の配列で試す
const strings = ["short", "longer", "longest string"];
// const longestString = findLongest(strings);
// console.log(longestString);

// オブジェクトの配列で試す（.lengthがないため、本来はエラーになるべき）
const objects = [{ name: "A" }, { name: "B" }];
// findLongest(objects);
