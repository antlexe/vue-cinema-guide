import { apiClient } from './client'
import type { Movie, User } from '@/components/types'

export const favoritesAPI = {
  // Получить избранные

  async getFavorites(): Promise<Movie[]> {
    const response = await apiClient.get<Movie[]>('/favorites')
    return response.data
  },

  // Добавить в избранное
  async addToFavorites(id: string): Promise<User> {
    const response = await apiClient.post<User>(
      '/favorites',
      { id: id },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return response.data
  },

  // Удалить из избранного
  async removeFromFavorites(movieId: number): Promise<User> {
    const response = await apiClient.delete<User>(`/favorites/${movieId}`)
    return response.data
  },
}
