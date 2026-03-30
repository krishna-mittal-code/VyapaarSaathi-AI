// upload.controller.js
import { analyzeCsvBuffer } from "../services/csv.service.js";
import { fail, ok } from "../utils/response.util.js";

export async function uploadCsvController(req, res, next) {
  try {
    if (!req.file) {
      return fail(res, 400, "CSV file is required in field 'file'");
    }

    const language = req.body?.language || "English";
    const result = await analyzeCsvBuffer(req.file.buffer, language);

    return ok(res, result);
  } catch (err) {
    return next(err);
  }
}