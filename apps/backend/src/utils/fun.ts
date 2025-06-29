export const authSwagger = (required: boolean) => ({
  detail: {
    security: required ? [{ bearerAuth: [] }] : [],
    swagger: {
      security: [{ bearerAuth: [] }],
      securityRequired: true
    }
  }
});