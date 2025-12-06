// src/others/app-types.ts

/**
 * Represents the data structure for a single user.
 * Originally from: src/others/async_await_problems.ts
 */
export interface UserData {
  id: number
  name: string
  email: string
}

/**
 * Represents the structure of the API response for user data.
 * Originally from: src/others/any_problems.ts
 */
export interface UserResponse {
  user: {
    id: number
    name: string
    email: string
  }
  details: {
    tags: string[]
    createdAt: string
  }
}
