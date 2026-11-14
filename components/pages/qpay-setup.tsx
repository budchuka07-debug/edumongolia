import { qpayReadiness } from "@/lib/payments/qpay";

const meaning: Record<string, string> = {
  EDU_QPAY_USERNAME: "merchant.qpay.mn дээрх нэвтрэх нэр",
  EDU_QPAY_PASSWORD: "тэр бүртгэлийн нууц үг",
  EDU_QPAY_INVOICE_CODE: "QPay-аас өгсөн invoice code",
  EDU_SITE_URL: "сайтын хаяг, жишээ нь https://edumongolia.mn",
};

export function QpaySetup() {
  const rows = qpayReadiness();
  const ready = rows.every((row) => row.set);
  return (
    <section className="mt-8 rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
      <h2 className="font-heading text-2xl font-semibold">QPay холболт</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        {ready
          ? "Дөрвөн утга сервер дээр байна. Нэхэмжлэх үүсгэх, төлбөр шалгах, callback энэ тохиргоогоор ажиллана."
          : "Код холбогдсон. Төлбөр гаргахын тулд доорх хоосон утгыг серверийн орчинд тавина. Утгыг энэ хуудас харуулахгүй, чат болон git рүү хийхгүй."}
      </p>
      <ul className="mt-5 space-y-3">
        {rows.map((row) => (
          <li key={row.name} className="rounded-2xl bg-background px-4 py-3 ring-1 ring-foreground/10">
            <p className="font-medium">{row.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{meaning[row.name]}</p>
            <p className="mt-1 text-sm">{row.set ? "Сервер дээр байна" : "Хоосон"}</p>
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
        <p>Локал: төслийн үндэс дээр `.env.local` үүсгээд `config/edu-qpay.example` доторх дөрвөн мөрийг хуулж, утгыг тэнд бөглөнө.</p>
        <p>Амьд сайт: хостын Environment Variables дээр яг энэ дөрвөн нэрээр нэмнэ. eSIMMongolia-ийн QPay бүртгэлийг энд бүү хий.</p>
      </div>
    </section>
  );
}
