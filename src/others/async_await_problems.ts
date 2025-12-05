// src/others/async_await_problems.ts

// ## 課題
// このファイルには、`async/await` を使った非同期処理の例が含まれていますが、
// エラーハンドリング、型定義、効率性の面で改善の余地があります。
//
// 1. **`fetchUserData` のエラーハンドリング**:
//    現在、`fetch` が失敗した場合（例: ネットワークエラー、404 Not Found）、
//    `try...catch` ブロックがないため、プロセス全体がクラッシュする可能性があります。
//    `try...catch` を追加して、エラー発生時に適切に `null` を返すように修正してみましょう。
//    また、成功時の戻り値の型 `Promise<any>` を、より具体的な `Promise<UserData | null>` に変更してみましょう。
//
// 2. **`fetchAllUsers` の逐次実行**:
//    この関数は `userIds` の配列を受け取り、ユーザーデータを一つずつ `await` で取得しています。
//    これでは、各APIリクエストが完了するのを待つため、非常に効率が悪いです。
//    `Promise.all` を使って、すべてのリクエストを並列に実行するようにリファクタリングし、
//    処理時間を大幅に短縮してみましょう。
//
// 3. **戻り値のフィルタリング**:
//    `fetchAllUsers` は、`fetchUserData` が `null` を返す可能性があるにもかかわらず、
//    戻り値の型が `Promise<UserData[]>` となっています。これは型定義として正しくありません。
//    取得したデータの中から `null` の値を取り除き、実際の戻り値が `UserData[]` になるように
//    フィルタリング処理を追加してみましょう。（`Array.prototype.filter` が便利です）

// --- ユーザーデータの型定義 ---
interface UserData {
  id: number;
  name: string;
  email: string;
}

// --- 課題1 & 2: ユーザーデータを取得する非同期関数 ---

// モックAPI: 実際にはネットワークリクエストをシミュレートします
const mockApiFetch = async (userId: number): Promise<Response> => {
  console.log(`Fetching user ${userId}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      if (userId > 0 && userId < 4) {
        resolve({
          ok: true,
          json: async () => ({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` }),
        } as Response);
      } else {
        resolve({ ok: false } as Response); // 存在しないユーザーの場合はエラーをシミュレート
      }
    }, 500 * Math.random());
  });
};


// 課題1: エラーハンドリングと戻り値の型が不十分
async function fetchUserData(userId: number): Promise<any> { // 戻り値が any になっている
  const response = await mockApiFetch(userId);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  // エラーの場合の考慮が抜けている
  return null;
}

// 課題2 & 3: 複数のユーザーデータを効率悪く取得し、型が不正確
async function fetchAllUsers(userIds: number[]): Promise<UserData[]> {
  const users = [];
  for (const id of userIds) {
    const user = await fetchUserData(id); // 1つずつ待っているため非効率
    users.push(user);
  }
  // userがnullの可能性があるのに、フィルタリングされていない
  return users;
}


// --- 実行例 ---
async function main() {
  console.log("--- fetchUserData実行 ---");
  const singleUser = await fetchUserData(1);
  console.log(singleUser);

  const nonExistentUser = await fetchUserData(99); // エラーハンドリングがないと問題が起きる可能性がある
  console.log(nonExistentUser); // nullが返るべき

  console.log("\n--- fetchAllUsers実行 ---");
  const userIds = [1, 2, 3, 4, 5]; // 4, 5 は存在しないユーザー
  const allUsers = await fetchAllUsers(userIds);
  console.log("Fetched users:", allUsers);
  console.log(`Expected 3 users, but got ${allUsers.length}`); // 期待する結果と異なる
}

main();
