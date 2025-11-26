export type ApiError = 
| { kind: "network"; message: string }
| { kind: "http"; status: number; message: string }
| { kind: "parse"; message: string }

export function fromUnknownToApiError(error: unknown): ApiError {
    if (error instanceof Error) {
       return  { kind: "network", message: error.message }
    }
    return { kind: "network", message: "Erro desconhecido" }
}