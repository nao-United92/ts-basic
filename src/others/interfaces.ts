// src/others/interfaces.ts

// interface: オブジェクトの構造を定義する

interface LabeledValue {
  label: string
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}

const myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj) // OK: myObjはlabelプロパティを持っているので、LabeledValueとして扱える

// オプショナルなプロパティ (?)
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

console.log(createSquare({ color: 'black' }))

// 読み取り専用プロパティ (readonly)
interface Point {
  readonly x: number
  readonly y: number
}

const p1: Point = { x: 10, y: 20 }
console.log(p1)
// p1.x = 5; // Error: readonlyなので変更できない

// 関数型
interface SearchFunc {
  (source: string, subString: string): boolean
}

const mySearch: SearchFunc = function (src, sub) {
  const result = src.search(sub)
  return result > -1
}
console.log(mySearch('hello world', 'world'))

// 継承
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

const square = {} as Square
square.color = 'blue'
square.sideLength = 10

console.log(square)
