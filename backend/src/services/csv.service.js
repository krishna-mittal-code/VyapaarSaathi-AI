
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { generateAiAnswer } from "./ai.service.js";

const AMOUNT_KEYS = [
  "amount",
  "total",
  "price",
  "revenue",
  "value",
  "sale",
  "sales",
  "transaction_amount",
];

function parseAmount(row) {
  for (const key of Object.keys(row)) {
    const normalized = key.toLowerCase().trim();
    if (!AMOUNT_KEYS.includes(normalized)) continue;

    const raw = String(row[key] ?? "").replace(/[^0-9.-]/g, "");
    const n = Number(raw);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

function buildCsvAiPrompt({
  totalRows,
  totalRevenue,
  avgOrderValue,
  minAmount,
  maxAmount,
  sampleRows,
}) {
  return [
    "You are a business analyst for a small merchant.",
    "Analyze this CSV summary and provide practical recommendations.",
    "",
    `Total rows: ${totalRows}`,
    `Total revenue: ${totalRevenue}`,
    `Average order value: ${avgOrderValue}`,
    `Minimum transaction: ${minAmount}`,
    `Maximum transaction: ${maxAmount}`,
    "",
    "Sample rows:",
    JSON.stringify(sampleRows, null, 2),
    "",
    "Return concise output with:",
    "1) 3 key insights",
    "2) 3 action recommendations",
    "3) 2 risk flags",
  ].join("\n");
}

export async function analyzeCsvBuffer(buffer, language = "English") {
  const csvText = buffer.toString("utf-8");

  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const processed = records.map((row) => {
    const normalized_amount = parseAmount(row);
    return { ...row, normalized_amount };
  });

  const totalRows = processed.length;
  const totalRevenue = processed.reduce(
    (sum, row) => sum + (row.normalized_amount || 0),
    0
  );
  const avgOrderValue = totalRows > 0 ? totalRevenue / totalRows : 0;

  const amounts = processed.map((r) => r.normalized_amount || 0);
  const minAmount = amounts.length ? Math.min(...amounts) : 0;
  const maxAmount = amounts.length ? Math.max(...amounts) : 0;

  const outputCsv = stringify(processed, {
    header: true,
    quoted: true,
  });

  const sampleRows = processed.slice(0, 5).map((row) => ({ ...row }));

  let ai_insights = "AI insights unavailable right now.";

  try {
    const prompt = buildCsvAiPrompt({
      totalRows,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      avgOrderValue: Number(avgOrderValue.toFixed(2)),
      minAmount: Number(minAmount.toFixed(2)),
      maxAmount: Number(maxAmount.toFixed(2)),
      sampleRows,
    });

    const { answer } = await generateAiAnswer(prompt, language);
    ai_insights = answer;
  } catch (err) {
    console.error("CSV AI analysis failed:", err.message);
  }

  return {
    total_rows: totalRows,
    total_revenue: Number(totalRevenue.toFixed(2)),
    average_order_value: Number(avgOrderValue.toFixed(2)),
    min_transaction: Number(minAmount.toFixed(2)),
    max_transaction: Number(maxAmount.toFixed(2)),
    ai_insights,
    downloadable_csv: outputCsv,
  };
}
