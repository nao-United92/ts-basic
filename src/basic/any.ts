export default function anySample() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let name: any = 'Torahack' // stringを代入
  console.log('any sample 1:', typeof name, name)

  name = 28
  console.log('any sample 2:', typeof name, name)
}
