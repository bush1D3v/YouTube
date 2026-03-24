import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'
import { fetchUser } from '../userService'

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      isAxiosError: (e: any) => !!e?.isAxiosError
    }
  }
})

const mockedAxios = axios as unknown as { get: any; isAxiosError: (e: any) => boolean }

describe('fetchUser', () => {
  it('retorna usuário no sucesso', async () => {
    const user = { id: 1, name: 'John', email: 'john@example.com' }
    ;(mockedAxios.get as any).mockResolvedValue({ data: user })
    await expect(fetchUser(1)).resolves.toEqual(user)
  })

  it('lança ApiError 404 quando não encontrado', async () => {
    const error = { isAxiosError: true, response: { status: 404 } }
    ;(mockedAxios.get as any).mockRejectedValue(error)
    await expect(fetchUser(2)).rejects.toMatchObject({ statusCode: 404, message: 'Usuário não encontrado' })
  })

  it('lança ApiError 500 quando erro interno', async () => {
    const error = { isAxiosError: true, response: { status: 500 } }
    ;(mockedAxios.get as any).mockRejectedValue(error)
    await expect(fetchUser(3)).rejects.toMatchObject({ statusCode: 500, message: 'Erro interno do servidor' })
  })

  it('lança ApiError 0 em erro de rede (sem response)', async () => {
    const error = { isAxiosError: true }
    ;(mockedAxios.get as any).mockRejectedValue(error)
    await expect(fetchUser(4)).rejects.toMatchObject({ statusCode: 0, message: 'Erro de rede' })
  })

  it('lança ApiError 0 em erro inesperado (não-Axios)', async () => {
    const error = new Error('boom')
    ;(mockedAxios.get as any).mockRejectedValue(error)
    await expect(fetchUser(5)).rejects.toMatchObject({ statusCode: 0, message: 'Erro inesperado' })
  })
})
