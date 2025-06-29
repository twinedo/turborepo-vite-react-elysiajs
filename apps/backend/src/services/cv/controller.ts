import { Elysia, t } from "elysia";
import { createOrUpdateCV, getCV } from "./model";
import { staticPlugin } from "@elysiajs/static";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { unlink } from "node:fs/promises";
import { authMiddleware } from "../auth/middleware";
import { authSwagger } from "src/utils/fun";

const UPLOAD_DIR = join(process.cwd(), "src", "uploads", "cv");

// Ensure upload directory exists
await mkdir(UPLOAD_DIR, { recursive: true });

export const cvController = new Elysia({ prefix: "/cv" })
  .use(
    staticPlugin({
      assets: UPLOAD_DIR,
      prefix: "/cv/files",
    })
  )
  .get("/", async () => {
    const cv = await getCV();
    return { cv };
  })
  .get("/download", async ({ set }) => {
    const cv = await getCV();

    if (!cv) {
      set.status = 404;
      return { error: "No CV found" };
    }

    const filePath = join(UPLOAD_DIR, cv.filename);

    // Set headers for download
    set.headers = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${cv.filename}"`,
    };

    // Return the file
    return new Response(Bun.file(filePath));
  })
  .guard(
    authSwagger(true),
    (app) =>
      app.post(
        "/upload",
        async ({ body, set, request }) => {
          const user = (request as any).user;
          if (!user) {
            set.status = 401;
            return {
              status: 401,
              message: "User authentication is missing",
            };
          }
          if (user.role !== "superadmin") {
            set.status = 403;
            return {
              status: 403,
              message: "You do not have permission to create projects",
            };
          }

          const file = Array.isArray(body.cv_file)
            ? body.cv_file[0]
            : body.cv_file;

          if (!file) throw new Error("No file uploaded");
          if (file.type !== "application/pdf")
            throw new Error("Only PDF files allowed");

          // Constant filename
          const filename = "Twin Edo Nugraha - CV.pdf";
          const filePath = join(UPLOAD_DIR, filename);

          // Delete existing file if it exists
          try {
            (await Bun.file(filePath).exists()) && (await unlink(filePath));
          } catch (error) {
            console.log("No existing file to delete");
          }

          // Save new file
          await Bun.write(filePath, file);
          const cv = await createOrUpdateCV(filename);

          return {
            success: true,
            message: "CV updated successfully",
            cv,
            url: `/cv/files/${filename}`,
            downloadUrl: `/cv/download`,
          };
        },
        {
          beforeHandle: authMiddleware(["superadmin"]).handle,
          body: t.Object({
            cv_file: t.Any(),
          }),
          parse: async ({ request }) => {
            const formData = await request.formData();
            const cv_file = formData.get("cv_file");
            return { cv_file };
          },
        }
      )
  );
