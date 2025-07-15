import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { cvController } from "./src/services/cv";
import { experienceController } from "./src/services/experience";
import { projectController } from "./src/services/projects";
import { projectImageController } from "./src/services/projectImages/controller";
import { authController } from "./src/services/auth";

const app = new Elysia()
  .use(
    cors({
      origin: process.env.VITE_FRONTEND_URL || true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      exposeHeaders: ["Content-Disposition"],
    })
  )
  .get("/", () => "Hello from Elysia!")
  .use(cvController)
  .use(experienceController)
  .use(projectController)
  .use(projectImageController)
  .use(authController)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Portfolio API",
          version: "1.0.0",
        },
        tags: [
          { name: "Project Images", description: "Image management endpoints" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  );

// Export for Vercel serverless functions
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};

// For local development
if (import.meta.env?.DEV) {
  app.listen(3000);
  console.log(
    `🦊 Backend running at http://${app.server?.hostname}:${app.server?.port}`
  );
}