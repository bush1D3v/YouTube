const router = (req: Request) => {
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname === "/health") {
        return new Response(JSON.stringify({ ok: true }), {
            headers: { "content-type": "application/json" }
        });
    }

    return new Response("Not found", { status: 404 });
}

Bun.serve({ port: 3000, fetch: router });

console.log("Server rodando em http://localhost:3000");