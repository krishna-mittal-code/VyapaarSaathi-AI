export function ok(res, data, status = 200) {
  return res.status(status).json(data);
}

export function fail(res, status, message) {
  return res.status(status).json({ detail: message, error: message });
}
