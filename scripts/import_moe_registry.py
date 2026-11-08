#!/usr/bin/env python3
"""Import the Ministry of Education institution lists of 17 June 2026.

Reads the two official .xls files and writes:
- data/moe/2026-06-17/institutions.json
- data/moe/2026-06-17/name-links.json
- supabase/seeds/moe-2026-06-17.sql

It copies only columns that exist in those files. English names, Mongolian names,
websites, addresses, coordinates, student counts, tuition, and deadlines are not invented.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import xlrd

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "moe" / "2026-06-17"
NOTICE = "http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/202606/t20260618_1441074.html"
REGULAR_URL = "http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/202606/W020260618416094865984.xls"
ADULT_URL = "http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/202606/W020260618307096079727.xls"
AS_OF = "2026-06-17"
CHECKED = "2026-11-08"

PROVINCE_MN = {
    "北京市": "Бээжин",
    "天津市": "Тяньжин",
    "河北省": "Хэбэй",
    "山西省": "Шаньси",
    "内蒙古自治区": "Өвөр Монгол",
    "辽宁省": "Ляонин",
    "吉林省": "Жилин",
    "黑龙江省": "Хэйлунжян",
    "上海市": "Шанхай",
    "江苏省": "Жянсү",
    "浙江省": "Жөжян",
    "安徽省": "Аньхуй",
    "福建省": "Фүжянь",
    "江西省": "Жянши",
    "山东省": "Шаньдун",
    "河南省": "Хэнань",
    "湖北省": "Хүбэй",
    "湖南省": "Хунань",
    "广东省": "Гуандун",
    "广西壮族自治区": "Гуанси",
    "海南省": "Хайнань",
    "重庆市": "Чунцин",
    "四川省": "Сычуань",
    "贵州省": "Гүйжоу",
    "云南省": "Юньнань",
    "西藏自治区": "Төвд",
    "陕西省": "Шэньси",
    "甘肃省": "Ганьсү",
    "青海省": "Цинхай",
    "宁夏回族自治区": "Нинся",
    "新疆维吾尔自治区": "Шинжаан",
}

HEADER = re.compile(r"^(.+?)（(\d+)所）$")


def code_of(value) -> str:
    if isinstance(value, float):
        return str(int(value))
    text = str(value).strip()
    if not re.fullmatch(r"\d{10}", text):
        raise SystemExit(f"institution code is not 10 digits: {value!r}")
    return text


def clean(value) -> str:
    return re.sub(r"\s+", " ", str(value or "").replace("\n", " ")).strip()


def read_sheet(path: Path, kind: str) -> list[dict]:
    sheet = xlrd.open_workbook(path).sheet_by_index(0)
    province = ""
    expected = None
    seen = 0
    rows: list[dict] = []
    for index in range(3, sheet.nrows):
        values = [sheet.cell_value(index, column) for column in range(sheet.ncols)]
        label = clean(values[0]) if isinstance(values[0], str) else ""
        name = clean(values[1])
        if not name and label:
            match = HEADER.fullmatch(label)
            if not match:
                raise SystemExit(f"unexpected section header: {label}")
            if expected is not None and seen != expected:
                raise SystemExit(f"{province}: expected {expected}, counted {seen}")
            province = match.group(1)
            expected = int(match.group(2))
            seen = 0
            if province not in PROVINCE_MN:
                raise SystemExit(f"no Mongolian region label for {province}")
            continue
        if not name:
            continue
        if not province:
            raise SystemExit(f"row before a province header: {name}")
        seen += 1
        remark = clean(values[-1])
        ownership = "private" if remark == "民办" else None
        remark_out = None if remark in ("", "民办") else remark
        if kind == "regular":
            level_text = clean(values[5])
            level = {"本科": "undergraduate", "专科": "vocational"}.get(level_text)
            if level is None:
                raise SystemExit(f"unknown level {level_text} for {name}")
            location = clean(values[4]) or None
            authority = clean(values[3])
            institution_type = "regular_undergraduate" if level == "undergraduate" else "higher_vocational"
        else:
            level = None
            location = None
            authority = clean(values[3])
            institution_type = "adult"
        rows.append(
            {
                "code": code_of(values[2]),
                "seq": int(values[0]),
                "nameZh": name,
                "kind": kind,
                "level": level,
                "institutionType": institution_type,
                "provinceZh": province,
                "provinceMn": PROVINCE_MN[province],
                "locationZh": location,
                "authorityZh": authority,
                "ownership": ownership,
                "remarkZh": remark_out,
            }
        )
    if expected is not None and seen != expected:
        raise SystemExit(f"{province}: expected {expected}, counted {seen}")
    return rows


def norm(name: str) -> str:
    return name.replace("（", "(").replace("）", ")").replace(" ", "")


def cross_links(rows: list[dict]) -> dict:
    link_text = (ROOT / "lib/marketplace/china-link-hosts.ts").read_text()
    dxj_text = (ROOT / "lib/marketplace/dongxueji-universities.ts").read_text()
    link = {
        norm(name): slug
        for slug, name in re.findall(
            r'"slug": "([^"]+)",\s*"provinceEn": "[^"]+",\s*"provinceZh": "[^"]+",\s*"provinceMn": "[^"]+",\s*"nameZh": "([^"]+)"',
            link_text,
        )
    }
    start = dxj_text.index("export const dongxuejiUniversities: DongxuejiUniversity[] = ")
    body = dxj_text[start:].split(";", 1)[0].split("= ", 1)[1]
    dxj = {norm(item["nameZh"]): item["slug"] for item in json.loads(body)}
    found = {}
    for row in rows:
        key = norm(row["nameZh"])
        item = {}
        if key in link:
            item["chinaLink"] = link[key]
        if key in dxj:
            item["dongxueji"] = dxj[key]
        if item:
            found[row["code"]] = item
    return found


def sql_literal(value: str | None) -> str:
    if value is None:
        return "null"
    return "'" + value.replace("'", "''") + "'"


def write_sql(rows: list[dict]) -> None:
    provinces = []
    seen = set()
    for row in rows:
        if row["provinceZh"] not in seen:
            seen.add(row["provinceZh"])
            provinces.append((row["provinceZh"], row["provinceMn"]))
    cities = []
    seen_cities = set()
    for row in rows:
        if not row["locationZh"]:
            continue
        key = (row["provinceZh"], row["locationZh"])
        if key not in seen_cities:
            seen_cities.add(key)
            cities.append(key)
    lines = [
        "-- Official Ministry of Education institution list, as of 17 June 2026.",
        "-- Generated by scripts/import_moe_registry.py. Do not edit by hand.",
        "-- Apply after supabase/schema.sql, supabase/knowledge-base.sql, and supabase/registry-profile.sql.",
        "-- Identity fields present in the spreadsheet are published. Admission, fees, and statistics are not inserted.",
        "",
        "insert into countries (code)",
        "values ('CN')",
        "on conflict (code) do nothing;",
        "",
        "insert into source_references (source_type, url, title, organization, status, received_on, verified_on, document_reference)",
        "select 'ministry_of_education',",
        f"  {sql_literal(NOTICE)},",
        "  '全国高等学校名单',",
        "  '中华人民共和国教育部',",
        "  'officially_verified',",
        "  date '2026-06-18',",
        f"  date '{CHECKED}',",
        "  '截至2026年6月17日'",
        "where not exists (select 1 from source_references where url = " + sql_literal(NOTICE) + ");",
        "",
    ]
    for name_zh, name_mn in provinces:
        lines.append(
            "insert into provinces (country_id, name_zh, name_mn)\n"
            "select id, " + sql_literal(name_zh) + ", " + sql_literal(name_mn) + " from countries where code = 'CN'\n"
            "and not exists (select 1 from provinces where country_id = countries.id and name_zh = " + sql_literal(name_zh) + ");"
        )
    lines.append("")
    for province, city in cities:
        lines.append(
            "insert into cities (province_id, name_zh)\n"
            "select id, " + sql_literal(city) + " from provinces where name_zh = " + sql_literal(province) + "\n"
            "and not exists (select 1 from cities where province_id = provinces.id and name_zh = " + sql_literal(city) + ");"
        )
    lines.append("")
    for row in rows:
        city_sql = "null"
        if row["locationZh"]:
            city_sql = (
                "(select city.id from cities city join provinces province on province.id = city.province_id "
                "where province.name_zh = " + sql_literal(row["provinceZh"]) + " and city.name_zh = " + sql_literal(row["locationZh"]) + ")"
            )
        lines.append(
            "insert into universities (\n"
            "  slug, country_id, province_id, city_id, institution_code, name_zh,\n"
            "  institution_type, university_type, administering_authority, education_level, ownership,\n"
            "  registry_location, registry_remark, officially_registered, international_student_status,\n"
            "  international_admission_status, publication_status, verification_status, last_verified_at,\n"
            "  demonstration, source_id\n"
            ")\n"
            "select "
            + sql_literal("moe-" + row["code"]) + ", country.id, province.id, " + city_sql + ", "
            + sql_literal(row["code"]) + ", " + sql_literal(row["nameZh"]) + ", "
            + sql_literal(row["institutionType"]) + ", "
            + ("'private'" if row["ownership"] == "private" else "null") + ", "
            + sql_literal(row["authorityZh"]) + ", "
            + sql_literal(row["level"]) + ", "
            + sql_literal(row["ownership"]) + ", "
            + sql_literal(row["locationZh"]) + ", "
            + sql_literal(row["remarkZh"]) + ", "
            "true, 'unknown', 'unpublished', 'published', 'officially_verified', "
            f"timestamptz '{CHECKED} 00:00:00+00', false, source.id\n"
            "from countries country\n"
            "join provinces province on province.country_id = country.id and province.name_zh = " + sql_literal(row["provinceZh"]) + "\n"
            "join source_references source on source.url = " + sql_literal(NOTICE) + "\n"
            "where country.code = 'CN'\n"
            "and not exists (select 1 from universities where institution_code = " + sql_literal(row["code"]) + ");"
        )
    lines.extend(
        [
            "",
            "insert into university_registries (university_id, registry, member_code, as_of, source_id)",
            "select university.id, 'moe_national', university.institution_code, date '2026-06-17', source.id",
            "from universities university",
            "join source_references source on source.url = " + sql_literal(NOTICE),
            "where university.institution_code is not null",
            "on conflict (university_id, registry) do nothing;",
            "",
            "insert into registry_statistics (registry, as_of, metric, value, source_id, verification_status, note)",
            "select 'moe_national', date '2026-06-17', metric, value, source.id, 'officially_verified',",
            "  'Counted from the Ministry spreadsheets attached to the 18 June 2026 notice. Not an international-admission list.'",
            "from source_references source",
            "cross join (values",
            "  ('higher_education_institutions', 3196),",
            "  ('regular_higher_education_institutions', 2952),",
            "  ('undergraduate_institutions', 1412),",
            "  ('higher_vocational_institutions', 1540),",
            "  ('adult_higher_education_institutions', 244)",
            ") as figures(metric, value)",
            "where source.url = " + sql_literal(NOTICE),
            "on conflict (registry, as_of, metric) do nothing;",
            "",
        ]
    )
    (ROOT / "supabase" / "seeds" / "moe-2026-06-17.sql").write_text("\n".join(lines) + "\n")


def main() -> None:
    regular = read_sheet(DATA / "regular.xls", "regular")
    adult = read_sheet(DATA / "adult.xls", "adult")
    rows = regular + adult
    codes = [row["code"] for row in rows]
    if len(codes) != len(set(codes)):
        raise SystemExit("duplicate institution code")
    undergraduate = sum(row["level"] == "undergraduate" for row in regular)
    vocational = sum(row["level"] == "vocational" for row in regular)
    if (len(regular), undergraduate, vocational, len(adult), len(rows)) != (2952, 1412, 1540, 244, 3196):
        raise SystemExit(f"unexpected counts {len(regular)} {undergraduate} {vocational} {len(adult)}")
    private = sum(row["ownership"] == "private" for row in rows)
    links = cross_links(rows)
    (DATA / "institutions.json").write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")))
    (DATA / "name-links.json").write_text(json.dumps(links, ensure_ascii=False, separators=(",", ":")))
    summary = {
        "asOf": AS_OF,
        "checkedOn": CHECKED,
        "noticeUrl": NOTICE,
        "regularFile": REGULAR_URL,
        "adultFile": ADULT_URL,
        "total": len(rows),
        "regular": len(regular),
        "undergraduate": undergraduate,
        "vocational": vocational,
        "adult": len(adult),
        "privateRemark": private,
        "crossLinks": len(links),
    }
    (DATA / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    write_sql(rows)
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
