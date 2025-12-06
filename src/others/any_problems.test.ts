// src/others/any_problems.test.ts

import { processData } from './any_problems'
import { UserResponse } from './app-types'

describe('any_problems', () => {
  describe('processData', () => {
    let consoleLogSpy: jest.SpyInstance

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      consoleLogSpy.mockRestore()
    })

    it('should process data correctly and return user ID and uppercased tags', () => {
      const responseData: UserResponse = {
        user: {
          id: 1,
          name: 'Taro',
          email: 'taro@example.com',
        },
        details: {
          tags: ['typescript', 'learning', 'refactoring'],
          createdAt: '2023-01-01T00:00:00Z',
        },
      }

      const expectedResult = {
        userId: 1,
        tags: ['TYPESCRIPT', 'LEARNING', 'REFACTORING'],
      }

      const result = processData(responseData)
      expect(result).toEqual(expectedResult)
    })

    it('should handle empty tags array', () => {
      const responseData: UserResponse = {
        user: {
          id: 2,
          name: 'Jiro',
          email: 'jiro@example.com',
        },
        details: {
          tags: [],
          createdAt: '2023-01-02T00:00:00Z',
        },
      }

      const expectedResult = {
        userId: 2,
        tags: [],
      }

      const result = processData(responseData)
      expect(result).toEqual(expectedResult)
    })

    it('should log the user name during processing', () => {
      const responseData: UserResponse = {
        user: {
          id: 1,
          name: 'Taro',
          email: 'taro@example.com',
        },
        details: {
          tags: [],
          createdAt: '2023-01-01T00:00:00Z',
        },
      }

      processData(responseData)
      // The file-level console.log will also be called.
      // We check if it was called with the specific message from the function.
      expect(consoleLogSpy).toHaveBeenCalledWith('Processing data for user: Taro')
    })

    // Invalid data (e.g., `tags` is not an array) would cause a runtime error.
    // We omit a test for this case because TypeScript's type system should prevent
    // such invalid data from being passed to `processData` in the first place.
  })
})
