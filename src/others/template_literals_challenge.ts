// src/others/template_literals_challenge.ts

// ## 課題
// このファイルには、単純な `string` 型が使われているため、特定のフォーマットを持つべき
// 文字列の型安全性が低くなっているコードが含まれています。
// 「テンプレートリテラル型」を活用して、これらの文字列の型をより厳密に、かつ
// 表現力豊かにリファクタリングしてみましょう。
//
// 1. **`createEventName` 関数の型定義の強化**:
//    `EventName` 型は現在、いくつかの文字列リテラルのUnion型です。
//    `Component` 型と `Action` 型を組み合わせて、`"Component_Action"` という形式の
//    イベント名をテンプレートリテラル型で動的に生成するように `EventName` 型を修正してみましょう。
//    （例: `"Header_Click"`, `"Button_Hover"` など）
//
// 2. **`setCssVariable` 関数のキーの型付け**:
//    `setCssVariable` 関数は、CSSカスタムプロパティ（`--`で始まる）を設定しますが、
//    `key` の型は単なる `string` です。テンプレートリテラル型を使って、`key` が
//    必ず `"--"` で始まる文字列であることを型レベルで強制するように修正してみましょう。
//
// 3. **APIエンドポイントの型定義**:
//    `ApiEndpoint` 型を定義して、APIの各エンドポイントの型安全性を高めたいです。
//    `Version` 型と `Resource` 型を組み合わせて、
//    `/api/v1/users` や `/api/v2/posts` のような形式のパスを表現する
//    テンプレートリテラル型を `ApiEndpoint` として定義してみましょう。
//    さらに、`fetchData` 関数の `endpoint` 引数にこの型を適用してみましょう。

// --- 課題1: イベント名の生成 ---

type Component = "Header" | "Footer" | "Button" | "Modal";
type Action = "Click" | "Hover" | "Submit" | "Close";

// TODO: `Component` と `Action` を使って "Component_Action" 形式の型を生成する
type EventName = string; // 現在はただのstring

function logEvent(eventName: EventName) {
  console.log(`Event logged: ${eventName}`);
}

logEvent("Header_Click");
logEvent("Button_Submit");
// logEvent("Unknown_Event"); // これはコンパイルエラーになるべき


// --- 課題2: CSSカスタムプロパティのキー ---

// TODO: `key` が `"--"` で始まる文字列であることを型で強制する
function setCssVariable(key: string, value: string) {
  // document.documentElement.style.setProperty(key, value);
  console.log(`CSS var set: ${key} = ${value}`);
}

setCssVariable("--primary-color", "blue");
setCssVariable("--font-size", "16px");
// setCssVariable("margin-top", "10px"); // これはコンパイルエラーになるべき


// --- 課題3: APIエンドポイントの型安全な定義 ---

type Version = "v1" | "v2";
type Resource = "users" | "posts" | "products";

// TODO: `/api/{Version}/{Resource}` 形式のAPIエンドポイントの型を定義する
type ApiEndpoint = string;

function fetchData(endpoint: ApiEndpoint) {
  console.log(`Fetching data from: ${endpoint}`);
  // fetch(`https://api.example.com${endpoint}`);
}

fetchData("/api/v1/users");
fetchData("/api/v2/products");
// fetchData("/api/v3/users"); // v3 は存在しないためエラーになるべき
// fetchData("/api/v1/comments"); // comments は存在しないためエラーになるべき
// fetchData("users/v1/api"); // フォーマットが違うためエラーになるべき
