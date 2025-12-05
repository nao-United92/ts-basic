// src/others/union_intersection.ts

// ## 課題
// このファイルでは、Union型 (`|`) と Intersection型 (`&`) を使った例が示されていますが、
// よりTypeScriptの型システムを効果的に利用し、コードの意図を明確にするための改善点があります。
//
// 1. **`printId` 関数の引数型 `string | number`**:
//    このUnion型はシンプルですが、もしIDが `string` の場合は特定の形式（例: "ID-123"）であると
//    いう制約を加えたい場合、どう表現できますか？リテラル型やより複雑なUnion型を検討してみましょう。
//
// 2. **`combine` 関数の戻り値型 `any`**:
//    `combine` 関数は2つのオブジェクトを結合しますが、戻り値が `any` になっています。
//    Intersection型を使って、結合後のオブジェクトの型を正確に表現してみましょう。
//    また、異なるプロパティ名を持つオブジェクトを渡した場合の挙動も考慮してみましょう。
//
// 3. **`Person` と `Worker` の型**:
//    `Person` と `Worker` はそれぞれ独立したインターフェースですが、これらを組み合わせて
//    「雇用されている人」を表す型 (`EmployedPerson` など) をIntersection型で定義し、
//    それを実際に使ってみましょう。
//
// 4. **型ガードの導入**:
//    `printDetailedInfo` 関数は `User | Admin` 型を受け取りますが、`isAdmin` プロパティの
//    存在を直接チェックしています。よりTypeScriptらしい「型ガード」のテクニックを導入して、
//    コードの安全性を高めてみましょう（例: `in` 演算子やユーザー定義型ガード）。

// --- 課題1: Union型の基礎 ---
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(`Your ID is: ${id.toUpperCase()}`);
    } else {
        console.log(`Your ID is: ${id}`);
    }
}

printId("abc123");
printId(12345);


// --- 課題2: Intersection型の基礎と `any` の問題 ---
function combine(objA: object, objB: object): any { // 戻り値がanyになっている
    return { ...objA, ...objB };
}

const obj1 = { name: "Alice", age: 30 };
const obj2 = { occupation: "Engineer", company: "XYZ Corp" };

const combinedObj = combine(obj1, obj2);
console.log(combinedObj.name);
console.log(combinedObj.occupation);


// --- 課題3: UnionとIntersectionの組み合わせ ---
interface Person {
    name: string;
    age: number;
}

interface Worker {
    employeeId: string;
    department: string;
}

// 雇用されている人を表す型を定義してみよう (例: EmployedPerson)
// type EmployedPerson = ?;

// --- 課題4: Union型と型ガードの機会 ---
interface User {
    name: string;
    email: string;
}

interface Admin {
    name: string;
    email: string;
    isAdmin: boolean;
    roles: string[];
}

function printDetailedInfo(person: User | Admin) {
    console.log(`Name: ${person.name}`);
    console.log(`Email: ${person.email}`);

    // ここでisAdminプロパティの存在を直接チェックしている
    // より安全でTypeScriptらしい型ガードを導入してみよう
    if ('isAdmin' in person && person.isAdmin) {
        console.log(`Roles: ${person.roles.join(', ')}`);
    }
}

const normalUser: User = { name: "Bob", email: "bob@example.com" };
const adminUser: Admin = { name: "Charlie", email: "charlie@example.com", isAdmin: true, roles: ["editor", "viewer"] };

printDetailedInfo(normalUser);
printDetailedInfo(adminUser);
