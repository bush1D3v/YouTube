import type { ApiError } from "./error.js";
import { fromUnknownToApiError } from "./error.js";
import type { PostResponse } from "./types.js";
import type { Result } from "./result.js";
import { ok, err } from "./result.js";

const BASE_URL = "https://dummyjson.com"

async function parseJson<T>(response: Response): Promise<Result<T, ApiError>> {
    try {
        const data: T = await response.json();
        return ok<T, ApiError>(data);
    } catch (error) {
        return err<T, ApiError>({
            kind: "parse",
            message: "Falha ao parsear JSON"
        })
    }
}

export async function getTyped<T>(
    path: string
): Promise<Result<T, ApiError>> {
    try {
        const response = await fetch(`${BASE_URL}${path}`)

        if (!response.ok) {
           return err<T, ApiError>({
                kind: "http",
                status: response.status,
                message: `Erro HTTP: ${response.status}`
            }) 
        }
        return await parseJson<T>(response)
    } catch (error) {
        return err<T, ApiError>({
            kind: "network",
            message: fromUnknownToApiError(error).message
        })
    }
}

export async function getPosts(): Promise<Result<PostResponse, ApiError>> {
    return getTyped<PostResponse>("/posts")
}