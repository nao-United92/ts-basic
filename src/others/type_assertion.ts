// src/others/type_assertion.ts

// ## 課題
// このファイルでは、型アサーション（`as` や `<>`）が使われています。
// 型アサーションは便利な反面、型安全性を損なう可能性があります。
// より安全な型ガードや型の工夫を使ってリファクタリングしてみましょう。
//
// 1. `findElement` 関数では、`HTMLElement` への型アサーションが使われています。
//    もし要素が見つからなかった場合、`null` が返るため、実行時エラーに繋がります。
//    `if` 文を使ったnullチェック（型ガード）を追加して、安全に処理できるようにしましょう。
//
// 2. `Vehicle` 型の定義では、`'car' | 'truck'` という具体的な型があります。
//    `getVehicleInfo` 関数では、`vehicle as Car` のように型アサーションを使っています。
//    `in` 演算子を使った型ガードで、`fuel` や `capacity` プロパティの存在を確認し、
//    より安全に各プロパティにアクセスできるように修正してみましょう。

// --- 課題1: DOM要素の型アサーション ---

function findElement(selector: string) {
  // `document.getElementById` は `HTMLElement | null` を返す
  const el = document.getElementById(selector)
  if (el) {
    el.style.display = 'block'
  }
}

// 実行例（HTML環境で実行する場合）
findElement('my-element')

// --- 課題2: オブジェクトの型アサーション ---

interface Car {
  type: 'car'
  fuel: number // ガソリン残量
}

interface Truck {
  type: 'truck'
  capacity: number // 積載量
}

type Vehicle = Car | Truck

function getVehicleInfo(vehicle: Vehicle) {
  switch (vehicle.type) {
    case 'car':
      console.log(`Gas left: ${vehicle.fuel}L`)
      break
    case 'truck':
      console.log(`Max load: ${vehicle.capacity}kg`)
      break
  }
}

const myCar: Vehicle = { type: 'car', fuel: 30 }
const myTruck: Vehicle = { type: 'truck', capacity: 1500 }

getVehicleInfo(myCar)
getVehicleInfo(myTruck)

// --- 発展課題 ---
// `getVehicleInfo` の `switch` 文は、新しい `Vehicle` の型 (例: `Bike`) が追加されたときに
// case を追加し忘れる可能性があります。
// `never` 型を使って、網羅性チェックを導入する方法を調べてみましょう。
