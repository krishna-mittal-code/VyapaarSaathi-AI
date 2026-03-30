export function notFoundHandler(req, res) {
  res.status(404).json({ detail: "Endpoint not found" });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (status >= 500) {
    console.error("[backend:error]", err);
  }

  res.status(status).json({ detail: message, error: message });
}
