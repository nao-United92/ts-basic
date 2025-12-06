// src/others/class_refactor.ts

// ## 課題
// この `UserProfile` クラスは動作しますが、よりTypeScriptらしく、より堅牢にリファクタリングする余地があります。
//
// 1. **コンストラクタの簡略化**:
//    `constructor` 内でのプロパティ代入は冗長です。
//    コンストラクタの引数に `public` や `private` のアクセス修飾子を直接付けることで、
//    プロパティの宣言と初期化を同時に行うことができます。この記法を使ってコードを短くしてみましょう。
//
// 2. **アクセサ（getter/setter）の導入**:
//    `lastLogin` は `Date` オブジェクトですが、外部から直接書き換え可能になっています。
//    これを `private` プロパティに変更し、`updateLogin` のようなメソッド経由でのみ更新できるようにしましょう。
//    また、`lastLogin` を読み取るための `getter` を作成してみましょう（例: `get lastLoginDate()`）。
//
// 3. **読み取り専用プロパティ**:
//    `userId` は一度設定されたら変更されるべきではありません。
//    `readonly` 修飾子を付けて、不変なプロパティにしてみましょう。

export class UserProfile {
  // `lastLogin` は `private` プロパティとしてカプセル化し、外部からの直接的な書き換えを防ぐ
  private _lastLogin: Date

  // コンストラクタの引数にアクセス修飾子と `readonly` を使用し、コードを簡潔にする
  constructor(
    public readonly userId: string, // `readonly` で不変性を保証
    public username: string,
  ) {
    // `lastLogin` はインスタンス生成時に初期化
    this._lastLogin = new Date()
  }

  // `_lastLogin` の値を安全に読み取るための getter
  get lastLogin(): Date {
    return this._lastLogin
  }

  // ユーザー情報を表示する
  displayProfile() {
    // getter を経由して `lastLogin` にアクセス
    console.log(`ID: ${this.userId}, Name: ${this.username}, Last Login: ${this.lastLogin.toLocaleString()}`)
  }

  // ログイン日時を更新するための専用メソッド
  updateLogin() {
    this._lastLogin = new Date()
    console.log('Login time updated.')
  }
}

// --- 利用例 ---
const user = new UserProfile('user-123', 'Alice')
user.displayProfile()

// 1秒待ってからログイン日時を更新
setTimeout(() => {
  user.updateLogin()
  user.displayProfile()
}, 1000)

// --- 問題点のあるコード例 ---
// 本来であれば、lastLoginはupdateLoginメソッド経由で更新されるべき
// しかし、publicになっているため外部から直接書き換えられてしまう
// user.lastLogin = new Date(0); // getterのみでsetterがないため、この行はコンパイルエラーになる
console.log("...Oops, lastLogin can't be modified directly anymore!")
user.displayProfile()

// userIdも書き換え可能になっている
// user.userId = 'new-id'; // readonlyなので、これはコンパイルエラーになる
