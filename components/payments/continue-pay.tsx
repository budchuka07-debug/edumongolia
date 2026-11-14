"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Bilingual } from "@/lib/payments/preview";
import type { PaidPage } from "@/lib/payments/pricing";
import type { SchoolQuestion } from "@/lib/content/school-play";
import { useI18n } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export type UnlockedReading = {
  rest: Bilingual | null;
  questions: SchoolQuestion[] | null;
  perAttempt: number;
  embedUrl?: string | null;
  html?: string | null;
};

function isUnlocked(reading: UnlockedReading | null | undefined) {
  return Boolean(reading && (reading.rest || reading.embedUrl || reading.html));
}

const copy = {
  mn: {
    open: "Эхний 40% нээлттэй.",
    continue: "Үргэлжлүүлэх",
    waiting: "QPay нэхэмжлэл үүсгэж байна.",
    scan: "QR уншуулж төлнө. Төлбөр баталгаажмагц үлдсэн мэдээлэл татагдана.",
    pending: "Төлбөр хараахан ороогүй.",
    missing: "QPay хараахан холбогдоогүй. Серверийн орчинд EDU_QPAY_USERNAME, EDU_QPAY_PASSWORD, EDU_QPAY_INVOICE_CODE, EDU_SITE_URL тавина. Локал бол төслийн .env.local. Амьд сайт бол хостын Environment Variables. Утгыг чат, git рүү бүү хий.",
    failed: "QPay нэхэмжлэл үүсгэж чадсангүй.",
    check: "Төлбөр шалгах",
  },
  en: {
    open: "The first 40% is open.",
    continue: "Continue",
    waiting: "Creating the QPay invoice.",
    scan: "Pay with the QR. The rest of the information loads after QPay confirms the payment.",
    pending: "The payment is not in yet.",
    missing: "QPay is not connected yet. Set EDU_QPAY_USERNAME, EDU_QPAY_PASSWORD, EDU_QPAY_INVOICE_CODE, and EDU_SITE_URL on the server. Locally that is .env.local. On the live site it is the host's environment variables. Do not put the values in chat or git.",
    failed: "The QPay invoice could not be created.",
    check: "Check payment",
  },
} as const;

function money(value: number) {
  return `${new Intl.NumberFormat("mn-MN").format(value)}₮`;
}

export function ContinuePay({
  kind,
  id,
  priceMnt,
  onUnlocked,
}: {
  kind: PaidPage;
  id: string;
  priceMnt: number;
  onUnlocked: (reading: UnlockedReading) => void;
}) {
  const { locale } = useI18n();
  const t = copy[locale];
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [links, setLinks] = useState<Array<{ name: string; link: string }>>([]);

  useEffect(() => {
    if (!orderId) return undefined;
    let stopped = false;
    async function poll() {
      const response = await fetch("/api/payments/qpay/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const body = await response.json().catch(() => ({}));
      if (stopped || !body.paid || !isUnlocked(body.reading)) return;
      onUnlocked(body.reading);
      router.refresh();
    }
    const timer = setInterval(() => { void poll(); }, 5000);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [orderId, onUnlocked, router]);

  async function start() {
    setBusy(true);
    setMessage(t.waiting);
    const response = await fetch("/api/payments/qpay/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id }),
    });
    const body = await response.json().catch(() => ({}));
    setBusy(false);
    if (body.alreadyPaid && isUnlocked(body.reading)) {
      onUnlocked(body.reading);
      router.refresh();
      return;
    }
    if (body.error === "qpay-not-configured") {
      setMessage(t.missing);
      return;
    }
    if (!response.ok || !body.orderId) {
      setMessage(t.failed);
      return;
    }
    setOrderId(body.orderId);
    setQrImage(typeof body.qrImage === "string" ? body.qrImage : "");
    const urls = Array.isArray(body.urls) ? body.urls : [];
    setLinks(urls.flatMap((item: { name?: string; description?: string; link?: string }) => (
      item?.link ? [{ name: item.name || item.description || "QPay", link: item.link }] : []
    )));
    setMessage(t.scan);
  }

  async function checkNow() {
    if (!orderId) return;
    const response = await fetch("/api/payments/qpay/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const body = await response.json().catch(() => ({}));
    if (body.paid && isUnlocked(body.reading)) {
      onUnlocked(body.reading);
      router.refresh();
      return;
    }
    setMessage(t.pending);
  }

  return (
    <div className="mt-5 rounded-2xl bg-secondary p-4">
      <p className="text-sm">{t.open}</p>
      <p className="mt-1 font-heading text-2xl font-semibold">{money(priceMnt)}</p>
      <Button className="mt-3" disabled={busy} onClick={() => { void start(); }}>{t.continue}</Button>
      {qrImage ? (
        <img
          alt="QPay"
          className="mt-4 w-full max-w-xs rounded-xl bg-card"
          src={qrImage.startsWith("data:") ? qrImage : `data:image/png;base64,${qrImage}`}
        />
      ) : null}
      {links.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2">
          {links.map((item) => (
            <a key={item.link} className="text-sm font-semibold text-primary" href={item.link} rel="noopener noreferrer" target="_blank">{item.name}</a>
          ))}
        </div>
      ) : null}
      {orderId ? <Button className="mt-3" variant="outline" onClick={() => { void checkNow(); }}>{t.check}</Button> : null}
      {message ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{message}</p> : null}
    </div>
  );
}
