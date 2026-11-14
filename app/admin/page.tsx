import type { Metadata } from "next";
import { UniversityCoverage } from "@/components/marketplace/university-coverage";
import { ScholarshipAdmin } from "@/components/scholarships/scholarship-admin";
import { AdminDesk } from "@/components/pages/admin-desk";
import { PriceAdmin } from "@/components/pages/price-admin";
import { QpaySetup } from "@/components/pages/qpay-setup";
import { loadPriceRules } from "@/lib/catalog/store";

export const metadata: Metadata = {
  title: "Админ самбар",
  description: "Сурагч, багшийн бүртгэл ба цагийн хуваарь.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <AdminDesk />
      <div className="mx-auto max-w-6xl px-4">
        <PriceAdmin initial={loadPriceRules()} />
        <QpaySetup />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <UniversityCoverage />
        <section className="mt-8">
          <h2 className="font-heading text-2xl font-semibold">Олон улсын тэтгэлэг</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Нийтийн жагсаалтад зөвхөн шалгасан мөр орно. Ноорог энд хадгалагдахгүй, нийтэд гарахгүй. Хугацаа өнгөрсөн мөрийг нээлттэй гэж харуулахгүй.
          </p>
          <p className="mt-3 text-sm">
            <a className="font-semibold text-primary" href="/admin/scholarship-export">Нийтэлсэн мөрийн CSV</a>
          </p>
          <ScholarshipAdmin />
        </section>
      </div>
    </>
  );
}
