// src/others/class_refactor.test.ts
import { UserProfile } from './class_refactor'

describe('UserProfile', () => {
  const userId = 'user-123'
  const username = 'Alice'
  let user: UserProfile

  beforeEach(() => {
    // Fake timersを使用してDateを制御する
    jest.useFakeTimers()
  })

  afterEach(() => {
    // Real timersに戻す
    jest.useRealTimers()
  })

  it('should initialize with correct userId, username, and lastLogin date', () => {
    const initialTime = new Date('2023-01-01T00:00:00.000Z')
    jest.setSystemTime(initialTime)

    user = new UserProfile(userId, username)

    expect(user.userId).toBe(userId)
    expect(user.username).toBe(username)
    expect(user.lastLogin).toEqual(initialTime)
  })

  it('should update lastLogin date when updateLogin is called', () => {
    const initialTime = new Date('2023-01-01T00:00:00.000Z')
    jest.setSystemTime(initialTime)
    user = new UserProfile(userId, username)

    const updatedTime = new Date('2023-01-01T00:00:01.000Z')
    jest.setSystemTime(updatedTime)
    user.updateLogin()

    expect(user.lastLogin).toEqual(updatedTime)
  })

  it('should have a readonly userId property', () => {
    jest.setSystemTime(new Date())
    user = new UserProfile(userId, username)

    // TypeScript will show a compile error for the next line.
    // This test checks the runtime behavior in JavaScript.
    expect(() => {
      // @ts-expect-error - Intentionally trying to assign to a readonly property.
      user.userId = 'new-id'
    }).toThrow()
  })

  it('should not have a setter for the lastLogin property', () => {
    jest.setSystemTime(new Date())
    user = new UserProfile(userId, username)

    // TypeScript will show a compile error as lastLogin has no setter.
    // This test checks the runtime behavior in JavaScript.
    expect(() => {
      // @ts-expect-error - Intentionally trying to assign to a getter-only property.
      user.lastLogin = new Date()
    }).toThrow()
  })
})
