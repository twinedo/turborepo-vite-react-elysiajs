import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/", () => "Hello from Elysia!")
  .listen(3000);

console.log(`🦊 Backend running at http://${app.server?.hostname}:${app.server?.port}`);