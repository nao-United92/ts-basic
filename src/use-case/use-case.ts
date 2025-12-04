import { RepositoryInterface } from '../repositories/repositories'

export class ExampleUseCase {
  constructor(private repository: RepositoryInterface) {}

  async execute() {
    const fetchedData = await this.repository.fetch()
    return fetchedData
  }
}
