import { Elysia, t } from "elysia";
import {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
} from "./model";
import type { ExperienceUpdateInput } from "./types";

export const experienceController = new Elysia({ prefix: "/experience" })
  // Create new experience
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const descriptionArray =
          typeof body.description === "string"
            ? body.description.split("\n").filter((line) => line.trim())
            : Array.isArray(body.description)
              ? body.description
              : [];

        const data = await createExperience({
          ...body,
          startDate: new Date(body.startDate),
          endDate: body.endDate ? new Date(body.endDate) : undefined,
          description: JSON.stringify(descriptionArray), // Convert to JSON string
        });
        set.status = 201;
        return {
          status: 201,
          message: "Experience created successfully",
          data: {
            ...data,
            description: descriptionArray, // Return parsed description
          },
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,
          message: "Failed to create experience",
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
    {
      body: t.Object({
        company: t.String(),
        position: t.String(),
        startDate: t.String({ format: "date-time" }),
        endDate: t.Optional(t.String({ format: "date-time" })),
        description: t.Optional(
          t.Union([
            t.String(), // Accept string with newlines
            t.Array(t.String()), // Or direct array
          ])
        ),
      }),
    }
  )

  // Get all experiences (sorted by endDate)
  .get("/", async ({ set }) => {
    try {
      const data = await getExperiences();
      const formattedExperiences = data.map((exp) => ({
        ...exp,
        description:
          typeof exp.description === "string" && exp.description
            ? JSON.parse(exp.description)
            : [],
      }));
      set.status = 200;
      return {
        status: 200,
        message: "Get experiences successfully",
        data: formattedExperiences,
      };
    } catch (error) {
      set.status = 500;
      return {
        status: 500,
        message: "Failed to get experiences",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  })

  // Update experience
  .patch(
    "/:id",
    async ({ params: { id }, body, set }) => {
      try {
        // Prepare update data with only provided fields
        const updateData: Partial<ExperienceUpdateInput> = {};

        if (body.company !== undefined) updateData.company = body.company;
        if (body.position !== undefined) updateData.position = body.position;

        if (body.startDate !== undefined) {
          updateData.startDate = new Date(body.startDate);
        }

        if (body.endDate !== undefined) {
          updateData.endDate = body.endDate ? new Date(body.endDate) : null;
        }

        if (body.description !== undefined) {
          updateData.description =
            typeof body.description === "string"
              ? JSON.stringify(
                  body.description.split("\n").filter((line) => line.trim())
                )
              : Array.isArray(body.description)
                ? JSON.stringify(body.description)
                : JSON.stringify([]);
        }

        // Check if experience exists first
        const exists = await getExperience(id);
        if (!exists) {
          set.status = 404;
          return {
            status: 404,
            message: "Experience not found",
          };
        }

        const data = await updateExperience(id, updateData);

        set.status = 200;
        return {
          status: 200,
          message: "Experience updated successfully",
          data: {
            ...data,
            description: data.description ? JSON.parse(data.description) : [],
          },
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,
          message: "Failed to update experience",
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        company: t.Optional(t.String()),
        position: t.Optional(t.String()),
        startDate: t.Optional(t.String({ format: "date-time" })),
        endDate: t.Optional(
          t.Union([t.String({ format: "date-time" }), t.Null()])
        ),
        description: t.Optional(
          t.Union([t.String(), t.Array(t.String()), t.Null()])
        ),
      }),
    }
  )

  // Delete experience
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      try {
        const data = await deleteExperience(id);
        set.status = 200;
        return {
          status: 200,
          message: "Experience deleted successfully",
          data,
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,
          message: "Failed to delete experience",
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
