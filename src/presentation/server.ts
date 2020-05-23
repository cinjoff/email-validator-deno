import { Application, Router } from "../deps.ts";

import routes from "./routes/index.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Routes
const router = new Router();

for (const r of routes) {
  router[r.method](r.path, r.handler);
}

app.use(router.routes());
app.use(router.allowedMethods());

const start = async (port: number) => {
  console.log("HTTP server listening on port: ", port);
  await app.listen({ port });
};

export default {
  start,
};
