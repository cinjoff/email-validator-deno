import server from "./presentation/server.ts";

const PORT = Number(Deno.env.get("PORT")) || 8000;

await server.start(PORT);
