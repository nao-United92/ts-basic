// src/others/functions.ts

// 名前付き関数
function add(x: number, y: number): number {
  return x + y
}

// 匿名関数
const myAdd = function (x: number, y: number): number {
  return x + y
}

// アロー関数
const myAddArrow = (x: number, y: number): number => {
  return x + y
}

console.log(add(1, 2))
console.log(myAdd(3, 4))
console.log(myAddArrow(5, 6))

// オプショナルな引数 (?)
// オプショナルな引数は、必ず必須の引数の後に記述する必要があります。
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`
  } else {
    return firstName
  }
}

console.log(buildName('Bob'))
console.log(buildName('Bob', 'Adams'))

// デフォルト引数
function buildNameWithDefault(firstName: string, lastName: string = 'Smith'): string {
  return `${firstName} ${lastName}`
}

console.log(buildNameWithDefault('Bob'))
console.log(buildNameWithDefault('Bob', 'Adams'))

// 可変長引数 (Rest Parameters)
function buildNameWithRest(firstName: string, ...restOfName: string[]): string {
  return `${firstName} ${restOfName.join(' ')}`
}

console.log(buildNameWithRest('Joseph', 'Samuel', 'Lucas', 'MacKinzie'))

// this とアロー関数
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

const deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    // アロー関数を使うと、`this`がDeckオブジェクトを指すようになる
    return () => {
      const pickedCard = Math.floor(Math.random() * 52)
      const pickedSuit = Math.floor(pickedCard / 13)
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  },
}

const cardPicker = deck.createCardPicker()
const pickedCard = cardPicker()

console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)
