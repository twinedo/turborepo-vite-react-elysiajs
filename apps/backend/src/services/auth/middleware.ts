import { Elysia } from "elysia";
import { verifyToken } from "./model";
import { prisma } from "prisma/client";

export const authMiddleware = (requiredRoles?: string[]) => {
  return new Elysia({ name: "authMiddleware" })
    .onBeforeHandle(async ({ set, headers }) => {
      const authHeader = headers["authorization"];

      if (!authHeader) {
        set.status = 401;
        throw new Error("Authorization header missing");
      }

      if (!authHeader.startsWith("Bearer ")) {
        set.status = 401;
        throw new Error("Invalid authorization format");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        set.status = 401;
        throw new Error("Token missing from authorization header");
      }

      try {
        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
        });

        if (!user) {
          set.status = 401;
          throw new Error("User not found");
        }

        if (requiredRoles && !requiredRoles.includes(user.role)) {
          set.status = 403;
          throw new Error("Insufficient permissions");
        }

        // Attach user to context
        return {
          user,
        };
      } catch (error) {
        set.status = 401;
        throw new Error("Invalid or expired token");
      }
    })
    .on("afterHandle", ({ request }) => {
      // Add the security requirement to Swagger docs
      if (!request.route.detail?.security) {
        request.route.detail = {
          ...(request.route.detail || {}),
          security: [{ bearerAuth: [] }],
        };
      }
    });
};
