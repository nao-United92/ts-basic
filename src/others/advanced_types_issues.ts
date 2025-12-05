// src/others/advanced_types_issues.ts

// ## 課題
// このファイルには、TypeScriptの高度な型（条件型、マッピング型など）の利用例が含まれていますが、
// 最適ではない実装や、より洗練された方法で表現できる箇所があります。
// これらの型をより効果的に、より簡潔に、そしてより堅牢に利用できるようにリファクタリングしてみましょう。
//
// 1. **`ApiResponse<T>` と `unwrapResponse` 関数**:
//    `ApiResponse` は成功時とエラー時で構造が異なります。`unwrapResponse` 関数では、
//    `response.status === 'success'` というチェックで型を絞り込んでいますが、
//    これをもっとシンプルで再利用可能な「型ガード」として抽出し、適用してみましょう。
//
// 2. **`createMutable` 関数とマッピング型**:
//    `createMutable` 関数はオブジェクトの全てのプロパティを `Mutable` に変更しようとします。
//    この関数は現在、オブジェクトをコピーして新しいオブジェクトを返していますが、
//    マッピング型を正しく利用して、より型安全かつ汎用的な方法で `Mutable<T>` を実現してみましょう。
//
// 3. **`User` と `AdminUser` から `ExcludeAdmin`**:
//    `ExcludeAdmin` は `User` から `AdminUser` を除外する型を目指していますが、
//    現在、コメントアウトされた部分で手動でプロパティを再定義しています。
//    TypeScriptの標準ユーティリティ型（例: `Omit` や `Exclude`、条件型）を組み合わせて、
//
//    `User` 型から `AdminUser` が持つプロパティを除外した型を自動的に導出するように修正してみましょう。
//    この型が `User` の `isAdmin` プロパティが `false` であることを表現できるかも検討してみましょう。
//
// 4. **`EventLogger` クラスとイベント型の課題**:
//    `EventLogger` クラスは様々なイベントをログに記録することを想定していますが、
//    `logEvent` メソッドの引数 `event` の型定義がまだ曖昧です。
//    イベントの種類に応じて異なるペイロードを持つUnion型を定義し、`logEvent` メソッド内で
//    その型に応じた処理（型ガードの利用）ができるように修正してみましょう。
//    特に、`'login'` イベントには `userId` と `ipAddress` が、
//    `'logout'` イベントには `userId` のみが必要であるとします。

// --- 課題1: 条件型と型ガードの機会 ---
interface SuccessResponse<T> {
    status: 'success';
    data: T;
}

interface ErrorResponse {
    status: 'error';
    message: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function unwrapResponse<T>(response: ApiResponse<T>): T | string {
    if (response.status === 'success') {
        return response.data;
    } else {
        return response.message;
    }
}

const successfulData: ApiResponse<string[]> = { status: 'success', data: ['item1', 'item2'] };
const errorData: ApiResponse<number> = { status: 'error', message: 'Failed to fetch' };

console.log(unwrapResponse(successfulData));
console.log(unwrapResponse(errorData));


// --- 課題2: マッピング型 `Mutable<T>` の実装 ---
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
    // TODO: Readonly<T> の逆で、全てのプロパティから `readonly` 修飾子を取り除くマッピング型を定義してみましょう
    // [P in keyof T]: T[P]; // これはまだ不完全
};

function createMutable<T extends object>(obj: Readonly<T>): Mutable<T> {
    const newObj: any = {}; // ここで any を使っているのが問題
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj as Mutable<T>; // ここでも型アサーションを使っている
}

interface Point {
    readonly x: number;
    readonly y: number;
}

const readOnlyPoint: Readonly<Point> = { x: 10, y: 20 };
const mutablePoint = createMutable(readOnlyPoint);
mutablePoint.x = 15; // mutablePoint は変更可能にしたい


// --- 課題3: 複雑な型の除外 (Exclude) ---
interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface AdminUser extends User {
    isAdmin: true; // AdminUserは常にisAdminがtrue
    roles: string[];
}

// TODO: User型からAdminUserのプロパティ（特にisAdmin: true）を除外した型を定義してみましょう
// type ExcludeAdmin = Omit<User, 'roles'> & { isAdmin: false }; // これはまだ不完全
// type NonAdminUser = ?;


// --- 課題4: イベントログの型課題 ---
class EventLogger {
    logEvent(eventName: string, payload: object) { // payloadがanyに近い状態
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Event: ${eventName}, Payload:`, payload);
        // TODO: ここで eventName に応じた型チェックや処理を追加してみましょう
    }
}

const logger = new EventLogger();
logger.logEvent('login', { userId: 'u123', ipAddress: '192.168.1.1' });
logger.logEvent('logout', { userId: 'u123' });
// logger.logEvent('unknown', { data: 'some data' }); // これは許容されるべきか？
