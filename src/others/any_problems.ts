import { UserResponse } from './app-types'
// ## 課題
// このファイルでは `any` 型が意図的に使用されています。
// TypeScriptの型システムを活かすために、`any` をより具体的な型に置き換えてみましょう。
//
// 1. `user` オブジェクトの型を定義する `interface` を作成してみましょう。
// 2. `processData` 関数の引数と戻り値の型を、`any` ではなく適切な型に修正しましょう。
// 3. `data` の中の `tags` が文字列の配列であることを型で表現してみましょう。

export function processData(data: UserResponse): { userId: number; tags: string[] } {
  console.log(`Processing data for user: ${data.user.name}`)

  // data.details.tags の中身を大文字に変換する
  const processedTags = data.details.tags.map((tag: string) => tag.toUpperCase())

  return {
    userId: data.user.id,
    tags: processedTags,
  }
}

const responseData: UserResponse = {
  user: {
    id: 1,
    name: 'Taro',
    email: 'taro@example.com',
  },
  details: {
    tags: ['typescript', 'learning', 'refactoring'],
    createdAt: '2023-01-01T00:00:00Z',
  },
}

const result = processData(responseData)
console.log(result)

console.log(result.userId.toFixed(2))
