export default function regexSample() {
  // 正規表現
  // 最初の小文字を大文字にする
  const small: string = '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
  const convertedSmall = small.replace(/[a-z]/, (match) => match.toUpperCase())
  console.log(convertedSmall)

  // 最初の大文字を小文字にする
  const big: string = '110EC58A-A0F2-4AC4-8393-C866D813B8D1'
  const convertedBig = big.replace(/[A-Z]/, (match) => match.toLowerCase())
  console.log(convertedBig)

  // 小文字全てを大文字にする
  const smallAll: string = '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
  const convertedSmallAll = smallAll.replace(/[a-z]/g, (match) => match.toUpperCase())
  console.log(convertedSmallAll)

  // 大文字全てを小文字にする
  const bigAll: string = '110EC58A-A0F2-4AC4-8393-C866D813B8D1'
  const convertedBigAll = bigAll.replace(/[A-Z]/g, (match) => match.toLowerCase())
  console.log(convertedBigAll)
}
