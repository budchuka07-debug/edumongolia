import { partnerMediaFor } from "@/lib/marketplace/dongxueji-media";
import { dongxuejiUniversities } from "@/lib/marketplace/dongxueji-universities";
import { paths } from "@/lib/marketplace/paths";

export function UniversityCoverage() {
  const withPhotos = dongxuejiUniversities.filter((item) => (partnerMediaFor(item.slug)?.images.length ?? 0) > 0).length;
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-semibold">Их сургуулийн профайл</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        Нийтийн хуудас хамтрагчийн зураг, хот, нээлттэй хөтөлбөрийг харуулна. Төлбөр, чансаа, байр, элсэлтийн нөхцөл, албан холбоос баталгаажаагүй бол «Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй байна.» Төлөв: хамтрагчаас ирсэн, эсвэл албан ёсоор нийтлэгдээгүй. Ноорог эндээс нийтэд гарахгүй.
      </p>
      <p className="mt-3 text-sm">
        Хамтрагч сургууль {dongxuejiUniversities.length}. Зурагтай нь {withPhotos}.
      </p>
      <p className="mt-2 text-sm">
        <a className="font-semibold text-primary" href="/admin/university-export">Нэр, хот, зургийн тооны CSV</a>
        {" · "}
        <a className="font-semibold text-primary" href={paths.university("peking-university")}>Жишээ профайл</a>
      </p>
    </section>
  );
}
