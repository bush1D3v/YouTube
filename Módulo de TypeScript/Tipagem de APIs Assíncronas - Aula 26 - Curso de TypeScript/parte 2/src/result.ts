export type Result<Ok, Err> =
| { ok: true; value: Ok }
| { ok: false; error: Err }

export function ok<Ok, Err = never>(value: Ok): Result<Ok, Err> {
    return { ok: true, value }
}

export function err<Ok = never, Err = unknown>(error: Err): Result<Ok, Err> {
    return { ok: false, error }
}

export function isOk<Ok, Err>(result: Result<Ok, Err>): result is { ok: true, value: Ok } {
    return result.ok;
}

export function isErr<Ok, Err>(result: Result<Ok, Err>): result is { ok: false, error: Err } {
    return !result.ok;
}