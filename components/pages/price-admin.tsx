"use client";

import { useState } from "react";
import { PRICE_CODES, type PriceRule } from "@/lib/catalog/prices";
import { Button } from "@/components/ui/button";

const labels: Record<PriceRule["code"], string> = {
  exam: "Шалгалт",
  project: "Төсөл",
  project_page: "Төслийн нэмэлт хуудас",
  quiz: "Асуулт",
  iq: "IQ тест",
  story: "Уншлага",
};

export function PriceAdmin({ initial }: { initial: PriceRule[] }) {
  const [rules, setRules] = useState(initial);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  function update(code: PriceRule["code"], field: "amountMnt" | "includedUnits", value: string) {
    const next = Number(value);
    setRules((current) => current.map((rule) => (rule.code === code ? { ...rule, [field]: Number.isFinite(next) ? next : 0 } : rule)));
  }

  async function save() {
    setMessage("");
    const response = await fetch("/api/catalog/prices", {
      method: "PUT",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ rules }),
    });
    const body = await response.json().catch(() => ({}));
    if (response.ok) setMessage("Үнэ хадгалагдлаа. Дараагийн нэхэмжлэх энэ дүнгээр гарна.");
    else if (body.error === "admin-token-unset") setMessage("EDU_ADMIN_TOKEN сервер дээр хоосон. Үнэ хадгалагдаагүй.");
    else if (response.status === 401) setMessage("Токен таарсангүй.");
    else setMessage("Үнэ хадгалагдсангүй.");
  }

  const page = rules.find((rule) => rule.code === "project_page");
  const project = rules.find((rule) => rule.code === "project");

  return (
    <section className="mt-8 rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
      <h2 className="font-heading text-2xl font-semibold">Бүтээгдэхүүний үнэ</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        Үнийг эндээс засна. Төслийн нэмэлт хуудасны мөрөнд нэг хуудасны үнэ болон үндсэн үнэд багтах хуудасны тоо байна.
        {project && page ? ` ${page.includedUnits} хуудас ${project.amountMnt.toLocaleString("mn-MN")}₮. Илүү хуудас бүр ${page.amountMnt.toLocaleString("mn-MN")}₮.` : ""}
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 font-medium">Бүтээгдэхүүн</th>
              <th className="py-2 font-medium">Үнэ, ₮</th>
              <th className="py-2 font-medium">Багтах нэгж</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_CODES.map((code) => {
              const rule = rules.find((item) => item.code === code);
              if (!rule) return null;
              return (
                <tr key={code} className="border-b border-border">
                  <td className="py-3">{labels[code]}</td>
                  <td className="py-3">
                    <input className="h-10 w-32 rounded-xl border border-border bg-background px-3" inputMode="numeric" value={rule.amountMnt} onChange={(event) => update(code, "amountMnt", event.target.value)} />
                  </td>
                  <td className="py-3">
                    <input className="h-10 w-24 rounded-xl border border-border bg-background px-3" inputMode="numeric" value={rule.includedUnits} onChange={(event) => update(code, "includedUnits", event.target.value)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <label className="mt-5 block text-sm font-medium">Админ токен
        <input className="mt-1 h-11 w-full max-w-md rounded-xl border border-border bg-background px-3" type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} />
      </label>
      <Button className="mt-4" type="button" onClick={save}>Үнэ хадгалах</Button>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
    </section>
  );
}
