"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shell, useMarket } from "@/components/marketplace/chrome";
import { cn } from "cn";

export function InquiryForm() {
  const { t } = useMarket();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Shell kicker={t.chinaKicker} title={t.inquiryTitle} lead={t.inquiryLead}>
      <form
        className="grid max-w-xl gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim() || !phone.trim()) {
            setMessage(t.required);
            return;
          }
          setMessage(t.saved);
          setName("");
          setPhone("");
          setNote("");
        }}
      >
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.name}</span>
          <Input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.phone}</span>
          <Input value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t.note}</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="min-h-28 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm"
          />
        </label>
        <button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-11 w-fit px-4")}>{t.submit}</button>
        {message ? <p className="text-sm">{message}</p> : null}
      </form>
    </Shell>
  );
}
