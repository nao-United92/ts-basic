// src/others/utility_types_exercise.ts

// ## 課題
// このファイルには、手動で実装された型変換やオブジェクト操作が含まれています。
// TypeScriptに組み込まれているユーティリティ型（`Pick`, `Omit`, `Partial`, `Required` など）を
// 活用することで、これらの処理をより簡潔、安全、かつ意図が明確なコードにリファクタリングできます。
//
// 1. **`createUserSummary` 関数の改善**:
//    この関数は `User` オブジェクトから一部のプロパティ（`id`, `name`）だけを抽出して
//    新しいオブジェクトを作成しています。この処理を `Pick` ユーティリティ型を使って、
//    より型安全かつ簡潔に書き換えてみましょう。戻り値の型定義も `Pick` を使って表現してみましょう。
//
// 2. **`getSensitiveUserInfo` 関数のリファクタリング**:
//    この関数は `User` オブジェクトから `password` プロパティを除外しようとしています。
//    現在、手動でプロパティを削除していますが、これは元のオブジェクトを意図せず変更してしまう
//    （ミューテーション）ため、バグの原因になりやすいです。
//    `Omit` ユーティリティ型を使って、`password` を除外した新しい型を定義し、
//    元のオブジェクトを変更せずに新しいオブジェクトを返すように修正してみましょう。
//
// 3. **`updateUser` 関数の柔軟性の向上**:
//    `updateUser` 関数はユーザー情報の一部を更新することを目的としていますが、
//    引数 `updates` の型が `User` のままだと、常にすべてのプロパティを渡す必要があり不便です。
//    `Partial` ユーティリティ型を使って、`updates` が `User` の一部のプロパティのみを
//    受け入れられるように型定義を修正し、関数の使い勝手を向上させてみましょう。
//
// 4. **`processConfig` 関数の堅牢性の向上**:
//    `AppConfig` はすべてのプロパティがオプショナルですが、`processConfig` 関数内では
//    `port` や `env` が必ず存在することを期待しています。
//    `Required` ユーティリティ型、またはデフォルト値とのマージを利用して、
//    関数内で扱う `config` オブジェクトがすべてのプロパティを持つことを型レベルで保証し、
//    より安全に処理できるようにリファクタリングしてみましょう。

// --- ユーザーの型定義 ---
interface User {
  id: number
  name: string
  email: string
  password?: string // パスワードはオプショナル
  createdAt: Date
}

// --- 課題1: オブジェクトから一部のプロパティを抽出する (`Pick`) ---
type UserSummary = Pick<User, 'id' | 'name'>

function createUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    name: user.name,
  }
}
const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date() }
const userSummary = createUserSummary(user)
console.log(userSummary)

// --- 課題2: オブジェクトから特定のプロパティを除外する (`Omit`) ---
type UserWithoutPassword = Omit<User, 'password'>

function getSensitiveUserInfo(user: User): UserWithoutPassword {
  const newUser: UserWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
  return newUser
}
const userWithPass: User = { id: 2, name: 'Bob', email: 'bob@example.com', password: '123', createdAt: new Date() }
const sensitiveInfo = getSensitiveUserInfo(userWithPass)
console.log(sensitiveInfo)
console.log(userWithPass.password) // undefined になってしまっている

// --- 課題3: オブジェクトの一部を更新する (`Partial`) ---
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates }
}
// nameだけ更新したいのに、emailやcreatedAtも渡す必要がある
const updatedUser = updateUser(user, {
  name: 'Alice Smith', // nameだけ更新したい
})
console.log(updatedUser)

// --- 課題4: オプショナルなプロパティを必須にする (`Required`) ---
interface AppConfig {
  port?: number
  env?: 'development' | 'production' | 'test'
  logLevel?: 'info' | 'warn' | 'error'
}

function processConfig(config: Required<AppConfig>) {
  console.log(`Running on port ${config.port} in ${config.env?.toUpperCase()} mode.`)
}

const defaultConfig: Required<AppConfig> = {
  port: 3000,
  env: 'development',
  logLevel: 'info',
}

const userConfig: AppConfig = {
  env: 'production',
}

// Merge userConfig with defaultConfig to ensure all properties are present
const finalConfig: Required<AppConfig> = { ...defaultConfig, ...userConfig }
processConfig(finalConfig)
