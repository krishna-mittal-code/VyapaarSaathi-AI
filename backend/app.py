"""
VyapaarSathi AI Backend  –  v0.4.0
Uses Gemini API for AI responses.
"""

import json
import logging
import os
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(message)s")
logger = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────
BASE_DIR     = Path(__file__).resolve().parent
DATA_PATH    = BASE_DIR.parent / "frontend" / "src" / "data" / "merchantData.json"
ENV_PATH     = BASE_DIR.parent / ".env"

if ENV_PATH.exists():
    with ENV_PATH.open("r", encoding="utf-8") as f:
        for line in f:
            text = line.strip()
            if not text or text.startswith("#") or "=" not in text:
                continue
            key, value = text.split("=", 1)
            key = key.strip()
            value = value.strip()
            if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
                value = value[1:-1]
            if key and key not in os.environ:
                os.environ[key] = value

# Remote Gemini model via API key.
GEMINI_MODEL = "gemini-3-flash-preview"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()

# ── Language registry ─────────────────────────────────────────────────────────
LANGUAGE_INSTRUCTIONS: dict[str, str] = {
    "english": "Respond in clear, concise English.",
    "hindi":   "Respond entirely in Hindi using Devanagari script. Do not use English words.",
    "bengali": "Respond entirely in Bengali using Bengali script. Do not use English words.",
    "tamil":   "Respond entirely in Tamil using Tamil script. Do not use English words.",
    "telugu":  "Respond entirely in Telugu using Telugu script. Do not use English words.",
    "french":  "Respond in clear, concise French.",
    "spanish": "Respond in clear, concise Spanish.",
}

SUPPORTED_LANGUAGES: set[str] = set(LANGUAGE_INSTRUCTIONS.keys())

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="VyapaarSathi AI Backend",
    description="Merchant assistant using Gemini API for AI responses.",
    version="0.4.0",
)


# ── Schemas ───────────────────────────────────────────────────────────────────
class AskRequest(BaseModel):
    question: str
    language: str = "English"

class AskResponse(BaseModel):
    answer: str


# ── Merchant data ─────────────────────────────────────────────────────────────
# Load only the required top-level sections using a streaming parser when available.
def _load_merchant_data() -> dict[str, Any]:
    try:
        import ijson
    except ImportError:
        logger.warning(
            "ijson not installed; falling back to full JSON load. "
            "Install it for streaming parse performance."
        )
        return _load_merchant_data_json()

    return _load_merchant_data_stream(ijson)


def _load_merchant_data_json() -> dict[str, Any]:
    try:
        with DATA_PATH.open("r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError as exc:
        raise RuntimeError(f"Merchant data not found at {DATA_PATH}") from exc


def _load_merchant_data_stream(ijson_module: Any) -> dict[str, Any]:
    try:
        with DATA_PATH.open("rb") as f:
            data: dict[str, Any] = {}
            for key, value in ijson_module.kvitems(f, "", use_float=True):
                if key in {
                    "merchantInfo",
                    "transactions",
                    "dailySales",
                    "inventory",
                    "returns",
                    "customerFeedback",
                }:
                    data[key] = value
            return data
    except FileNotFoundError as exc:
        raise RuntimeError(f"Merchant data not found at {DATA_PATH}") from exc

merchant_data: dict[str, Any] = _load_merchant_data()


# ── Pre-computed stats ────────────────────────────────────────────────────────
def _compute_stats(data: dict[str, Any]) -> dict[str, Any]:
    txns      = data.get("transactions", [])
    daily     = data.get("dailySales",   [])
    inventory = data.get("inventory",    [])
    returns   = data.get("returns",      [])
    feedback  = data.get("customerFeedback", [])
    info      = data.get("merchantInfo", {})

    total_sales  = sum(t["amount"] for t in txns)
    txn_count    = len(txns)
    repeat_count = sum(1 for t in txns if t.get("customerType") == "repeat")
    new_count    = txn_count - repeat_count
    repeat_pct   = round(repeat_count / txn_count * 100) if txn_count else 0

    hour_counts: dict[str, int] = {}
    for t in txns:
        h = t["time"].split(":")[0]
        hour_counts[h] = hour_counts.get(h, 0) + 1
    peak_hour = (max(hour_counts, key=hour_counts.get) + ":00") if hour_counts else "N/A"

    cat_revenue: dict[str, int] = {}
    for t in txns:
        c = t.get("category", "Unknown")
        cat_revenue[c] = cat_revenue.get(c, 0) + t["amount"]
    top_category = max(cat_revenue, key=cat_revenue.get) if cat_revenue else "N/A"

    weekly_total  = sum(d["sales"] for d in daily)
    weekly_people = sum(d.get("footfall", 0) for d in daily)
    avg_sales     = round(weekly_total  / len(daily)) if daily else 0
    avg_footfall  = round(weekly_people / len(daily)) if daily else 0
    best_day      = max(daily, key=lambda d: d["sales"])["day"] if daily else "N/A"

    low_stock = [
        f"{i['item']} (have {i['stock']}, reorder at {i['reorderLevel']})"
        for i in inventory if i["stock"] < i["reorderLevel"]
    ]
    top_items = sorted(inventory, key=lambda i: i["unitsSoldThisWeek"], reverse=True)[:3]
    top_items_str = ", ".join(
        f"{i['item']} ({i['unitsSoldThisWeek']} units)" for i in top_items
    )
    return_summary = "; ".join(
        f"{r['item']}: {r['count']} ({r['reason']})" for r in returns
    ) or "None"

    pos_fb = [f["theme"] for f in feedback if f["sentiment"] == "positive"]
    neg_fb = [f["theme"] for f in feedback if f["sentiment"] == "negative"]

    return {
        "merchant_name": info.get("name", "Your Store"),
        "location":      info.get("location", ""),
        "store_type":    info.get("type", ""),
        "total_sales":   total_sales,
        "txn_count":     txn_count,
        "repeat_count":  repeat_count,
        "new_count":     new_count,
        "repeat_pct":    repeat_pct,
        "peak_hour":     peak_hour,
        "top_category":  top_category,
        "avg_sales":     avg_sales,
        "avg_footfall":  avg_footfall,
        "best_day":      best_day,
        "low_stock":     low_stock,
        "top_items":     top_items_str,
        "return_summary": return_summary,
        "pos_fb":        pos_fb,
        "neg_fb":        neg_fb,
    }


STATS: dict[str, Any] = _compute_stats(merchant_data)
logger.info("Stats ready: %s", STATS)

# In-memory response cache to speed repeated AI questions during a server session.
ANSWER_CACHE: dict[tuple[str, str], str] = {}


# ── Prompt builder ────────────────────────────────────────────────────────────
def _build_system_prompt(language_key: str) -> str:
    s    = STATS
    lang = LANGUAGE_INSTRUCTIONS.get(language_key, LANGUAGE_INSTRUCTIONS["english"])

    low_stock_lines = (
        "\n".join(f"  - {item}" for item in s["low_stock"])
        if s["low_stock"] else "  - None"
    )

    return f"""You are VyapaarSathi, a friendly AI business advisor for small Indian shop owners.
{lang}
Keep answers to 3-5 sentences. Use the Rupee symbol for amounts. Be warm and practical.

=== STORE DATA ===
Store      : {s['merchant_name']} | {s['store_type']} | {s['location']}
Sales today: Rs.{s['total_sales']} across {s['txn_count']} transactions
Customers  : {s['new_count']} new + {s['repeat_count']} repeat ({s['repeat_pct']}% loyal)
Peak hour  : {s['peak_hour']} | Best day: {s['best_day']}
Top earner : {s['top_category']} category
Best sellers: {s['top_items']}
Daily avg  : Rs.{s['avg_sales']} sales | {s['avg_footfall']} customers
Low stock  :
{low_stock_lines}
Returns    : {s['return_summary']}
Praise     : {', '.join(s['pos_fb']) or 'None'}
Complaints : {', '.join(s['neg_fb']) or 'None'}
=================
Only use the data above. Never invent numbers."""


# ── Gemini inference ──────────────────────────────────────────────────────────

def _extract_gemini_text(response_json: dict[str, Any]) -> str:
    if not isinstance(response_json, dict):
        raise ValueError("Unexpected Gemini response format")

    if "error" in response_json:
        error = response_json["error"]
        code = error.get("code")
        message = error.get("message", "Unknown Gemini error")
        raise ValueError(f"Gemini API Error {code}: {message}")

    if "candidates" in response_json:
        candidates = response_json["candidates"]
        if isinstance(candidates, list) and candidates:
            first = candidates[0]
            if isinstance(first, dict):
                content = first.get("content")
                if isinstance(content, dict):
                    parts = content.get("parts")
                    if isinstance(parts, list) and parts:
                        first_part = parts[0]
                        if isinstance(first_part, dict) and isinstance(first_part.get("text"), str):
                            return first_part["text"].strip()
                text = first.get("output") or first.get("content")
                if isinstance(text, str):
                    return text.strip()

    if isinstance(response_json.get("output"), str):
        return response_json["output"].strip()

    raise ValueError("Unable to parse Gemini response")


async def _ask_gemini(system: str, question: str) -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured.",
        )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": system},
                    {"text": question},
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 512,
            "candidateCount": 1,
        },
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        for attempt in range(1, 3):
            try:
                resp = await client.post(GEMINI_URL, params={"key": GEMINI_API_KEY}, json=payload)
                resp.raise_for_status()
                break
            except httpx.HTTPStatusError as exc:
                logger.error("Gemini HTTP error attempt %d: %s", attempt, exc)
                if attempt == 2:
                    raise HTTPException(
                        status_code=502,
                        detail=f"Gemini returned {exc.response.status_code}: {exc.response.text}",
                    )
                logger.info("Retrying Gemini request...")
                continue
            except httpx.RequestError as exc:
                logger.error("Gemini request error attempt %d: %s", attempt, exc)
                if attempt == 2:
                    raise HTTPException(
                        status_code=503,
                        detail=f"Cannot reach Gemini: {exc}",
                    )
                logger.info("Retrying Gemini request...")
                continue

    data = resp.json()
    if isinstance(data, dict) and "error" in data:
        error = data["error"]
        code = error.get("code", "unknown")
        message = error.get("message", "Unknown Gemini error")
        logger.error("Gemini API Error %s: %s", code, message)
        return "AI is resting, try again in a minute."

    try:
        return _extract_gemini_text(data)
    except ValueError as exc:
        logger.warning("Gemini response parse failed: %s", exc)
        return "I can't answer that right now."


async def _ask_with_gemini(system: str, question: str) -> str:
    return await _ask_gemini(system, question)


# ── Endpoint ──────────────────────────────────────────────────────────────────
@app.post("/api/ask", response_model=AskResponse)
async def ask_ai(request: AskRequest):
    # Normalize and validate input from the frontend.
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question must not be empty.")

    language_key = request.language.strip().lower()
    if language_key not in SUPPORTED_LANGUAGES:
        logger.warning("Unknown language '%s' — falling back to English.", language_key)
        language_key = "english"

    # Return a cached answer for identical questions to reduce repeated model calls.
    cache_key = (question, language_key)
    if cache_key in ANSWER_CACHE:
        return AskResponse(answer=ANSWER_CACHE[cache_key])

    system = _build_system_prompt(language_key)
    answer = await _ask_with_gemini(system, question)
    ANSWER_CACHE[cache_key] = answer
    return AskResponse(answer=answer)


# ── Health / model check ──────────────────────────────────────────────────────
@app.get("/health")
async def health():
    """Health check for Gemini API configuration."""
    return {
        "status": "ok" if GEMINI_API_KEY else "model_not_found",
        "gemini_enabled": bool(GEMINI_API_KEY),
        "gemini_model": GEMINI_MODEL if GEMINI_API_KEY else None,
        "supported_languages": sorted(SUPPORTED_LANGUAGES),
    }