import type { Bilingual } from "../payments/preview";

/** Reading copy for project pages. The writing-order price stays separate from the 10,000₮ continuation. */
export const projectBriefs: Record<string, Bilingual[]> = {
  kindergarten: [
    {
      mn: "Энэ төсөл нэг дүүрэгт 80 хүүхдийн цэцэрлэг нээх бүтцийг харуулна. Эхний хэсэгт зорилго, хэнд зориулсан, ямар хэрэгцээ байгааг уншина.",
      en: "This project shows the shape of a kindergarten for 80 children in one district. The opening states the aim, who it is for, and the need.",
    },
    {
      mn: "Хэрэгцээг тухайн дүүргийн цэцэрлэгийн сул байр, 2–5 насны хүүхдийн тоогоор тайлбарлана. Энд тоо зохиохгүй. Захиалагч өөрийн дүүргийн тоогоо оруулна.",
      en: "The need is described with vacant kindergarten places and the count of children aged 2–5. Figures are not invented here. The client supplies the district count.",
    },
    {
      mn: "Эхний хуудсууд нь зорилго, байршил, бүлгийн хэмжээ, багшийн орон тоог нэрлэнэ. Үйл ажиллагааны дэлгэрэнгүй, төсвийн мөр, хуанли дараагийн хэсэгт байна.",
      en: "The first pages name the aim, the site, the group size, and the teaching posts. Operations, budget lines, and the calendar come in the following section.",
    },
    {
      mn: "Үргэлжлэлд төсвийн мөрүүд орно: байр, тавилга, цалин, хоол, нөөц. Мөр бүр нэгж, тоо хэмжээ, эх сурвалжтай байна. Нийлбэрийг захиалагчийн тооноос гаргана.",
      en: "The continuation holds the budget lines: premises, furniture, wages, meals, and a reserve. Each line has a unit, a quantity, and a source. The total uses the client's own figures.",
    },
    {
      mn: "Хуанли нь байршил сонгох, зөвшөөрөл, засвар, багш авах, нээлт гэсэн дараалалтай. Сар бүрийн хариуцагчийг нэрлэнэ.",
      en: "The calendar runs from choosing a site, through permits, repairs, hiring teachers, to opening. Each month names who is responsible.",
    },
    {
      mn: "Эрсдэл нь байр олдохгүй байх, зөвшөөрөл хойшлох, багшийн дутагдал. Хариулт бүр нэг алхамтай. Эх сурвалж нь цэцэрлэгийн стандарт, дүүргийн судалгаа, захиалагчийн тоо.",
      en: "The risks are no premises, a delayed permit, and too few teachers. Each response is one step. Sources are the kindergarten standard, a district survey, and the client's figures.",
    },
  ],
  syllabus: [
    {
      mn: "Энэ төсөл нэг ангийн хичээлийн жилийн хөтөлбөрийн бүтэц. Эхний хэсэгт хичээл, анги, жилийн зорилгыг уншина.",
      en: "This project is the shape of one class's year syllabus. The opening names the subject, the grade, and the year's aim.",
    },
    {
      mn: "Жилийн зорилго гурваас илүүгүй. Тухайн зорилгыг жил дуусахад юу хийж чаддаг байхаар бичнэ. Сурах бичгийн нэрийг захиалагч өөрөө баталгаажуулна.",
      en: "The year has no more than three aims. Each aim says what a student can do by the end of the year. The client confirms the textbook title.",
    },
    {
      mn: "Эхний хүснэгт нь улирал, сэдэв, цагийг нэрлэнэ. Үнэлгээний хувь, даалгаврын жишээ, эх сурвалж дараагийн хэсэгт байна.",
      en: "The first table names the term, the topic, and the hours. Assessment weights, a sample task, and the sources follow.",
    },
    {
      mn: "Үргэлжлэлд үнэлгээг улирлын шалгалт, даалгавар, оролцоо гэж хуваана. Хувь бүрийн нийлбэр 100 байна. Нэг даалгаврын загвар, шалгуур хамт орно.",
      en: "The continuation splits assessment into a term test, tasks, and participation. The weights add to 100. One task sample and its criteria are included.",
    },
    {
      mn: "Эх сурвалж нь сурах бичиг, багшийн гарын авлага, нэг нэмэлт текст. Холбоос бүрийг захиалагч шалгана. Файл энд зарагддаггүй.",
      en: "Sources are the textbook, the teacher's guide, and one extra text. The client checks each reference. No file is sold here.",
    },
  ],
};
