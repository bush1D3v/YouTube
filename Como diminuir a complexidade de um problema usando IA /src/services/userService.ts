import axios from 'axios'

export interface User {
  id: number
  name: string
  email: string
}

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchUser(id: number): Promise<User> {
  try {
    const response = await axios.get<User>(`/api/users/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      if (status === 404) throw new ApiError(404, 'Usuário não encontrado')
      if (status === 500) throw new ApiError(500, 'Erro interno do servidor')
      if (!error.response) {
        throw new ApiError(0, 'Erro de rede')
      }
    }
    throw new ApiError(0, 'Erro inesperado')
  }
}
