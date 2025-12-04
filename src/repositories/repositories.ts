export interface RepositoryInterface {
  fetch: () => Promise<string>
}

export class ExampleRepository implements RepositoryInterface {
  constructor() {}

  async fetch(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data')
      }, 5000)
    })
  }
}
