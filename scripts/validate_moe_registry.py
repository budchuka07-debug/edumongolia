#!/usr/bin/env python3
"""Check the generated Ministry registry without rewriting it."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "moe" / "2026-06-17"
rows = json.loads((DATA / "institutions.json").read_text())
summary = json.loads((DATA / "summary.json").read_text())
codes = [row["code"] for row in rows]
assert len(rows) == 3196, len(rows)
assert len(set(codes)) == 3196
assert summary["regular"] == 2952
assert summary["undergraduate"] == 1412
assert summary["vocational"] == 1540
assert summary["adult"] == 244
assert all(len(code) == 10 and code.isdigit() for code in codes)
assert all(row["nameZh"] for row in rows)
assert all(row.get("nameEn") in (None, "") and row.get("nameMn") in (None, "") for row in rows)
assert sum(row["ownership"] == "private" for row in rows) == summary["privateRemark"]
print("moe registry ok", summary["total"])
