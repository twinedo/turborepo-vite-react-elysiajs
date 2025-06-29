import { Elysia, t } from "elysia";
import {
  createProjectImage,
  getProjectImages,
  updateProjectImage,
  deleteProjectImage,
} from "./model";
import { staticPlugin } from "@elysiajs/static";
import { join } from "node:path";
import { mkdir, unlink } from "node:fs/promises";
import { prisma } from "prisma/client";
import { authMiddleware } from "../auth/middleware";
import swagger from "@elysiajs/swagger";
import { authSwagger } from "src/utils/fun";

const UPLOAD_BASE = join(process.cwd(), "src", "uploads", "projects");

export const projectImageController = new Elysia({ prefix: "/project-images" })
  .use(
    staticPlugin({
      assets: UPLOAD_BASE,
      prefix: "/project/files",
    })
  )
  .guard(authSwagger(true), (app) =>
    app
      .use(
        swagger({
          documentation: {
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
      )
      .post(
        "/upload",
        async ({ body: { file, bucket }, set, request }) => {
          try {
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
            // Validate bucket format (alphanumeric with dashes)
            if (!/^[a-z0-9-]+$/.test(bucket)) {
              set.status = 400;
              return { status: 400, message: "Invalid bucket format" };
            }

            // Ensure bucket directory exists
            const bucketDir = join(UPLOAD_BASE, bucket);
            await mkdir(bucketDir, { recursive: true });

            // Generate unique filename
            const ext = file.name.substring(file.name.lastIndexOf("."));
            const filename = `img-${Date.now()}${ext}`;
            const filePath = join(bucketDir, filename);

            // Save file
            await Bun.write(filePath, file);

            // Create database record
            const data = await createProjectImage({ bucket, filename });

            set.status = 201;
            return {
              status: 201,
              message: "Image uploaded successfully",
              data: {
                ...data,
                url: `/project/files/${bucket}/${filename}`,
              },
            };
          } catch (error) {
            set.status = 500;
            return {
              status: 500,
              message: "Failed to upload image",
              error: error instanceof Error ? error.message : String(error),
            };
          }
        },
        {
          beforeHandle: authMiddleware(["superadmin"]).handle,
          body: t.Object({
            file: t.File(),
            bucket: t.String(),
          }),
        }
      )
      // Update image metadata
      .patch(
        "/:id",
        async ({ params: { id }, body, set }) => {
          try {
            const data = await updateProjectImage(id, body);

            set.status = 200;
            return {
              status: 200,
              message: "Image updated successfully",
              data,
            };
          } catch (error) {
            set.status = 500;
            return {
              status: 500,
              message: "Failed to update image",
              error: error instanceof Error ? error.message : String(error),
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: t.Object({
            isFeatured: t.Optional(t.Boolean()),
            order: t.Optional(t.Number()),
          }),
        }
      )
      // Delete image
      .delete(
        "/:id",
        async ({ params: { id }, set }) => {
          try {
            // Get image record first to determine bucket
            const image = await prisma.projectImage.findUnique({
              where: { id },
            });
            if (!image) {
              set.status = 404;
              return { status: 404, message: "Image not found" };
            }

            // Delete file from filesystem
            const filePath = join(UPLOAD_BASE, image.bucket, image.filename);
            await unlink(filePath).catch(() => {});

            // Delete database record
            await deleteProjectImage(id);

            set.status = 200;
            return {
              status: 200,
              message: "Image deleted successfully",
            };
          } catch (error) {
            set.status = 500;
            return {
              status: 500,
              message: "Failed to delete image",
              error: error instanceof Error ? error.message : String(error),
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
        }
      )
  )
  // Upload new image (using bucket)

  // Get all images for a bucket
  .get(
    "/:bucket",
    async ({ params: { bucket }, set }) => {
      try {
        const images = await getProjectImages(bucket);
        const data = images.map((img) => ({
          ...img,
          url: `/project/files/${bucket}/${img.filename}`,
        }));

        set.status = 200;
        return {
          status: 200,
          message: "Get project images successfully",
          data,
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,
          message: "Failed to get project images",
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
    {
      params: t.Object({
        bucket: t.String(),
      }),
    }
  );
