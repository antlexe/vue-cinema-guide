import { apiClient } from './client'

// Типы
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  surname: string
}

export interface User {
  name: string
  surname: string
  email: string
  favorites: string[]
}

// API методы
export const authAPI = {
  // Логин
  async login(data: LoginData): Promise<{ result: boolean }> {
    const response = await apiClient.post<{ result: boolean }>(
      '/auth/login',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return response.data
  },

  // Регистрация
  async register(data: RegisterData): Promise<{ result: boolean }> {
    const response = await apiClient.post<{ result: boolean }>('/user', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  // Выход
  async logout(): Promise<{ result: boolean }> {
    const response = await apiClient.get<{ result: boolean }>('/auth/logout')
    return response.data
  },

  // Получить профиль
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/profile')
    return response.data
  },
}
