export async function hashPassword(password: string) {
    return await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 10
    });
}

export async function verifyPassword(password: string, stored: string) {
    return await Bun.password.verify(password, stored, "bcrypt");
}