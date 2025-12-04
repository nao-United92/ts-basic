export default function objectSample() {
  // オブジェクトリテラル記法で型定義
  let country: {
    language: string
    name: string
  } = {
    language: 'Japanese',
    name: 'Japan',
  }

  console.log('Object object sample 1:', country)

  country = {
    language: 'English',
    name: 'United States of America',
  }

  console.log('Object object sample 2:', country)

  // オブジェクトとreadonly
  const torahack: {
    age: number
    lastname: string
    readonly firstname: string
    gender?: string
  } = {
    age: 28,
    lastname: 'Yamada',
    firstname: 'Taro',
  }

  torahack.gender = 'male'
  torahack.lastname = 'Kamado'
  // torahack.firstname = 'Tanjiro'

  console.log('Object object sample 3:', torahack)

  // インデックスシグネチャ
  const capitals: {
    [countryName: string]: string
  } = {
    Japan: 'Tokyo',
    Korea: 'Seoul',
  }

  capitals.China = 'Beijing'
  capitals.Canada = 'Ottawa'

  console.log('Object object sample 4:', capitals)
}
