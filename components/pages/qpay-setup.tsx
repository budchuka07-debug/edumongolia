import { connection } from "next/server";
import { qpayReadiness } from "@/lib/payments/qpay";

const meaning: Record<string, string> = {
  EDU_QPAY_USERNAME: "merchant.qpay.mn дээрх нэвтрэх нэр. eSIM сайт дээрх нэр нь QPAY_USERNAME.",
  EDU_QPAY_PASSWORD: "тэр бүртгэлийн нууц үг. eSIM сайт дээрх нэр нь QPAY_PASSWORD.",
  EDU_QPAY_INVOICE_CODE: "QPay invoice code. eSIM сайт дээрх нэр нь QPAY_INVOICE_CODE.",
  EDU_SITE_URL: "сайтын хаяг. eSIM сайт дээрх нэр нь SITE_URL эсвэл BASE_URL.",
};

export async function QpaySetup() {
  await connection();
  const rows = qpayReadiness();
  const ready = rows.filter((row) => row.name !== "EDU_SITE_URL").every((row) => row.set);
  return (
    <section className="mt-8 rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
      <h2 className="font-heading text-2xl font-semibold">QPay холболт</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        {ready
          ? "QPay холбогдсон. Нэхэмжлэх үүсгэх, төлбөр шалгах, callback энэ тохиргоогоор ажиллана."
          : "QPay гаргахын тулд нэр, нууц үг, invoice code гурвыг серверийн орчинд тавина. Утгыг энэ хуудас харуулахгүй."}
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
