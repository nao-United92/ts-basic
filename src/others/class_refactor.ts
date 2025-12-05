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

class UserProfile {
  public userId: string;
  public username: string;
  public lastLogin: Date;

  constructor(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
    this.lastLogin = new Date();
  }

  // ユーザー情報を表示する
  displayProfile() {
    console.log(`ID: ${this.userId}, Name: ${this.username}, Last Login: ${this.lastLogin.toLocaleString()}`);
  }

  // ログイン日時を更新する
  updateLogin() {
    this.lastLogin = new Date();
    console.log("Login time updated.");
  }
}

// --- 利用例 ---
const user = new UserProfile('user-123', 'Alice');
user.displayProfile();

// 1秒待ってからログイン日時を更新
setTimeout(() => {
  user.updateLogin();
  user.displayProfile();
}, 1000);


// --- 問題点のあるコード例 ---
// 本来であれば、lastLoginはupdateLoginメソッド経由で更新されるべき
// しかし、publicになっているため外部から直接書き換えられてしまう
user.lastLogin = new Date(0); // 1970年の日時に書き換えてしまう
console.log("...Oops, lastLogin was modified directly!");
user.displayProfile();

// userIdも書き換え可能になっている
// user.userId = 'new-id'; // readonlyにすれば、これはコンパイルエラーになる
