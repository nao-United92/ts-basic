export default function genericsBasicSample() {
  // ジェネリック型を使わない場合
  const stringReduce = (array: string[], initialValue: string): string => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }

    return result
  }

  console.log('Generics basic sample 1:', stringReduce(['May ', 'the ', 'force ', 'be ', 'with ', 'you'], ''))

  const numberReduce = (array: number[], initialValue: number): number => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }

    return result
  }

  console.log('Generics basic sample 2:', numberReduce([100, 200, 300], 1000))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Reduce = {
    (array: string[], initialValue: string): string
    (array: number[], initialValue: number): number
  }

  type GenericReduce<T> = {
    (array: T[], initialValue: T): T
  }

  const genericStringReduce: GenericReduce<string> = (array, initialValue) => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }

    return result
  }
  console.log('Generics basic sample 3:', genericStringReduce(['May ', 'the ', 'force ', 'be ', 'with ', 'you'], ''))

  const genericNumberReduce: GenericReduce<number> = (array, initialValue) => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }

    return result
  }
  console.log('Generics basic sample 4:', genericNumberReduce([100, 200, 300], 1000))

  // 色々なジェネリック型の定義方法
  // 完全な呼び出しシグネチャ（個々のシグネチャにジェネリック型を割り当てる）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericReduce2 = {
    <T>(array: T[], initialValue: T): T
    <U>(array: U[], initialValue: U): U
  }

  // 呼び出しシグネチャの省略記法
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericReduce3<T> = (array: T[], initialValue: T) => T
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericReduce4 = <T>(array: T[], initialValue: T) => T
}
