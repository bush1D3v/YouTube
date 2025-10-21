import { expect, test } from "bun:test";
import { hashPassword, verifyPassword } from "../src/auth"

test("Hash e verificação de senha", async () => {
    const hash = await hashPassword("senha123");
    expect(await verifyPassword("senha123", hash)).toBe(true);
})