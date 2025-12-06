// src/others/async_await_problems.test.ts

// fetchUserDataとfetchAllUsersは、内部で定義されたmockApiFetchに依存しています。
// そのため、ここでは外部から見える振る舞いのみをテストします（ブラックボックステスト）。
// mockApiFetchの実装（userIdが1, 2, 3の時だけ成功する）を前提とします。

// モジュールをインポートするとmain()が実行されてしまうため、jest.mockを使用して、
// テスト対象の関数のみをインポートし、副作用を限定します。
const { fetchUserData, fetchAllUsers } = jest.requireActual('./async_await_problems')

describe('Async/Await Problems', () => {
  // 非同期処理が含まれるため、テストのタイムアウトを10秒に設定
  jest.setTimeout(10000)

  describe('fetchUserData', () => {
    it('should return user data for a valid user ID (e.g., 1)', async () => {
      const user = await fetchUserData(1)
      expect(user).toEqual({
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
      })
    })

    it('should return null for a non-existent user ID (e.g., 99)', async () => {
      const user = await fetchUserData(99)
      expect(user).toBeNull()
    })

    it('should return null for a user ID that results in a failed response according to mock (e.g., 4)', async () => {
      const user = await fetchUserData(4)
      expect(user).toBeNull()
    })
  })

  describe('fetchAllUsers', () => {
    it('should return an array of user data for an array of valid user IDs', async () => {
      const users = await fetchAllUsers([1, 2, 3])
      expect(users).toEqual([
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
        { id: 3, name: 'User 3', email: 'user3@example.com' },
      ])
    })

    it('should filter out null results for non-existent user IDs', async () => {
      const users = await fetchAllUsers([1, 99, 2, 100, 3])
      expect(users).toEqual([
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
        { id: 3, name: 'User 3', email: 'user3@example.com' },
      ])
    })

    it('should return an empty array when given an empty array', async () => {
      const users = await fetchAllUsers([])
      expect(users).toEqual([])
    })

    it('should return an empty array if all user IDs are non-existent', async () => {
      const users = await fetchAllUsers([99, 100, 101])
      expect(users).toEqual([])
    })
  })
})
