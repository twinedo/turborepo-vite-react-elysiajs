import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { cvController } from "src/services/cv";
import { experienceController } from "src/services/experience";
import { projectController } from "src/services/projects";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello from Elysia!")
  .use(cvController)
  .use(experienceController)
  .use(projectController)
  .use(swagger())
  .listen(3000);

console.log(`🦊 Backend running at http://${app.server?.hostname}:${app.server?.port}`);