// src/others/this_context_problems.ts

// ## 課題
// このファイルには、`this` のコンテキスト（文脈）が原因で意図しない動作を引き起こす
// コードが含まれています。JavaScriptとTypeScriptにおける `this` の挙動を理解し、
// アロー関数や `.bind` メソッド、`this` パラメータの型注釈などを使って問題を修正してみましょう。
//
// 1. **`Counter` クラスの `start` メソッド**:
//    `start` メソッド内で `setInterval` のコールバックとして `this.increment` を渡していますが、
//    このままでは `increment` メソッド内の `this` が `Counter` インスタンスを指さなくなり、
//    `this.count` が `undefined` となって `NaN` が表示されてしまいます。
//    `this` が正しく `Counter` インスタンスを指すように、3つの異なる方法で修正してみてください。
//    a) アロー関数をコールバックとして使う
//    b) `increment` メソッド自体をアロー関数で定義する
//    c) `constructor` で `.bind` を使う
//
// 2. **`DOMHandler` クラスのイベントリスナー**:
//    `listen` メソッドでは、`addEventListener` のコールバックで `this.onClick` を使っています。
//    これも `Counter` と同様に、コールバック実行時の `this` が `DOMHandler` インスタンスではなく、
//    イベントを発火させた要素（この場合は `document.body`）を指してしまいます。
//    `this.message` が正しく表示されるように、この問題を修正してみましょう。
//
// 3. **`addCallback` 関数の `this` 型注釈**:
//    `addCallback` 関数は、第一引数で受け取ったオブジェクトのメソッドとして
//    第二引数のコールバックを呼び出すことを期待しています。しかし、現状ではコールバック内の
//    `this` が `any` 型になっており、型安全ではありません。
//    `this` パラメータの型注釈（`function(this: T, ...)`）を使って、コールバック内の
//    `this` が `obj` の型であることをTypeScriptコンパイラに伝え、`this.name` への
//    アクセスを型安全にしてみましょう。

// --- 課題1: クラスメソッドとコールバックにおける `this` ---
class Counter {
  count: number = 0

  constructor() {
    // 解決策 c) constructorで .bind(this) を使う
    // this.increment = this.increment.bind(this);
  }

  // 解決策 b) メソッドをアロー関数で定義する
  // increment = () => { ... }
  increment() {
    this.count++
    console.log(this.count)
  }

  start() {
    console.log('Counter started...')
    // このままでは `this.increment` 内の `this` がグローバルオブジェクトまたは undefined を指す
    // setInterval(this.increment, 1000);

    // 解決策 a) コールバックとしてアロー関数を渡す
    setInterval(() => this.increment(), 1000)
  }
}

const counter = new Counter()
counter.start()

// --- 課題2: DOMイベントリスナーにおける `this` ---
class DOMHandler {
  message: string = 'Button clicked!'

  listen() {
    // このままだと、クリック時に this.message が undefined になる
    document.body.addEventListener('click', this.onClick.bind(this))
  }

  onClick() {
    // ここでの `this` は `DOMHandler` インスタンスではなく `document.body` を指す
    alert(this.message)
  }
}

const handler = new DOMHandler()
handler.listen()
// alert("Click anywhere on the page.");

// --- 課題3: `this` パラメータの型注釈 ---
interface Callable {
  name: string
  call(cb: () => void): void
}

function addCallback(obj: Callable, cb: (this: Callable) => void) {
  obj.call(cb)
}

const myObject = {
  name: 'MyObject',
  call(cb: () => void) {
    cb.call(this) // `this` を指定してコールバックを呼び出す
  },
}

// cb内の `this` が any 型のため、型安全ではない
addCallback(myObject, function () {
  console.log(`Callback called from: ${this.name}`)
})
