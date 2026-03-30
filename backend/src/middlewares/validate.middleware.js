export function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        detail: "Invalid request body",
        error: parsed.error.issues.map((i) => i.message).join(", "),
      });
    }
    req.validatedBody = parsed.data;
    next();
  };
}
