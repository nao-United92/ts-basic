import { ExampleRepository } from '../repositories/repositories'
import { ExampleUseCase } from './use-case'

const mockFetch = jest.fn(() => Promise.resolve('mock data'))

test('ExmapleUseCase test', async () => {
  const repository = new ExampleRepository()
  repository.fetch = mockFetch

  const useCase = new ExampleUseCase(repository)
  const actualData = await useCase.execute()

  expect(actualData).toBe('data')
}, 6000)
