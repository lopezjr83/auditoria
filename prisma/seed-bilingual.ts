import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const QUESTIONS_WITH_TRANSLATIONS = {
  SMETA: [
    {
      section: "SMETA Pillar 1: Labour",
      section_es: "SMETA Pilar 1: Trabajo",
      subsection: "1.1 Child Labour Prevention",
      subsection_es: "1.1 Prevención del Trabajo Infantil",
      questions: [
        {
          en: "Is there written confirmation that all workers are above the minimum working age?",
          es: "¿Hay confirmación escrita de que todos los trabajadores están por encima de la edad mínima?",
          severity: "CRITICAL",
        },
        {
          en: "Are all workers required to provide proof of age upon employment?",
          es: "¿Se requiere que todos los trabajadores proporcionen prueba de edad al empleo?",
          severity: "CRITICAL",
        },
        {
          en: "Is there a policy prohibiting child labour and is it communicated to all workers?",
          es: "¿Existe una política que prohíba el trabajo infantil y se comunica a todos?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "SMETA Pillar 1: Labour",
      section_es: "SMETA Pilar 1: Trabajo",
      subsection: "1.2 Forced Labour",
      subsection_es: "1.2 Trabajo Forzado",
      questions: [
        {
          en: "Are workers free to leave employment with no more than 30 days notice?",
          es: "¿Los trabajadores son libres de dejar el empleo con no más de 30 días de notificación?",
          severity: "CRITICAL",
        },
        {
          en: "Are identity documents held by the company or withheld from workers?",
          es: "¿La empresa retiene documentos de identidad de los trabajadores?",
          severity: "CRITICAL",
        },
        {
          en: "Are wages deducted as punishment?",
          es: "¿Se deducen salarios como castigo?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "SMETA Pillar 1: Labour",
      section_es: "SMETA Pilar 1: Trabajo",
      subsection: "1.3 Freedom of Association",
      subsection_es: "1.3 Libertad de Asociación",
      questions: [
        {
          en: "Are workers allowed to associate freely and join unions?",
          es: "¿Se permite que los trabajadores se asocien libremente y se unan a sindicatos?",
          severity: "MAJOR",
        },
        {
          en: "Are there worker representatives or committees in the facility?",
          es: "¿Hay representantes de trabajadores o comités en la instalación?",
          severity: "MINOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 1: Labour",
      section_es: "SMETA Pilar 1: Trabajo",
      subsection: "1.4 Wages and Benefits",
      subsection_es: "1.4 Salarios y Beneficios",
      questions: [
        {
          en: "Are workers paid at least the national minimum wage or industry minimum?",
          es: "¿Se paga a los trabajadores al menos el salario mínimo nacional o de industria?",
          severity: "MAJOR",
        },
        {
          en: "Are wages paid regularly and documented with pay slips?",
          es: "¿Se pagan salarios regularmente y se documentan con recibos?",
          severity: "MAJOR",
        },
        {
          en: "Are overtime wages paid at least 1.25x the normal rate?",
          es: "¿Se pagan las horas extras al menos 1.25x la tarifa normal?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 1: Labour",
      section_es: "SMETA Pilar 1: Trabajo",
      subsection: "1.5 Working Hours",
      subsection_es: "1.5 Jornada Laboral",
      questions: [
        {
          en: "Are regular working hours limited to maximum 48 hours per week?",
          es: "¿Se limitan las horas regulares de trabajo a máximo 48 horas por semana?",
          severity: "MAJOR",
        },
        {
          en: "Are workers entitled to at least one day off per week?",
          es: "¿Tienen derecho los trabajadores a al menos un día libre por semana?",
          severity: "MAJOR",
        },
        {
          en: "Is overtime voluntary and are records maintained?",
          es: "¿Es el trabajo en horas extras voluntario y se mantienen registros?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      section_es: "SMETA Pilar 2: Salud y Seguridad",
      subsection: "2.1 Health & Safety Management",
      subsection_es: "2.1 Gestión de Salud y Seguridad",
      questions: [
        {
          en: "Is there a documented health and safety policy covering all operations?",
          es: "¿Existe una política de salud y seguridad documentada que cubra todas las operaciones?",
          severity: "CRITICAL",
        },
        {
          en: "Is there a designated health and safety officer or committee?",
          es: "¿Hay un oficial de salud y seguridad designado o un comité?",
          severity: "MAJOR",
        },
        {
          en: "Are hazard assessments conducted regularly?",
          es: "¿Se realizan evaluaciones de peligros regularmente?",
          severity: "MAJOR",
        },
        {
          en: "Are corrective actions tracked to completion?",
          es: "¿Se rastrean las acciones correctivas hasta su finalización?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      section_es: "SMETA Pilar 2: Salud y Seguridad",
      subsection: "2.2 Personal Protective Equipment",
      subsection_es: "2.2 Equipo de Protección Personal",
      questions: [
        {
          en: "Is appropriate PPE provided to all workers at no cost?",
          es: "¿Se proporciona EPP apropiado a todos los trabajadores sin costo?",
          severity: "CRITICAL",
        },
        {
          en: "Is PPE in good condition and regularly replaced?",
          es: "¿El EPP está en buen estado y se reemplaza regularmente?",
          severity: "MAJOR",
        },
        {
          en: "Are workers trained on correct use and maintenance of PPE?",
          es: "¿Se capacita a los trabajadores sobre el uso y mantenimiento correcto del EPP?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      section_es: "SMETA Pilar 2: Salud y Seguridad",
      subsection: "2.3 Machinery and Equipment",
      subsection_es: "2.3 Maquinaria y Equipos",
      questions: [
        {
          en: "Are all machinery and equipment maintained in safe working condition?",
          es: "¿Se mantiene toda la maquinaria y equipos en condiciones seguras?",
          severity: "CRITICAL",
        },
        {
          en: "Are guards in place on moving parts and sharp edges?",
          es: "¿Hay protecciones en las partes móviles y bordes afilados?",
          severity: "CRITICAL",
        },
        {
          en: "Are workers trained on safe operation of equipment?",
          es: "¿Se capacita a los trabajadores sobre operación segura de equipos?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "SMETA Pillar 3: Environment",
      section_es: "SMETA Pilar 3: Ambiente",
      subsection: "3.1 Environmental Management",
      subsection_es: "3.1 Gestión Ambiental",
      questions: [
        {
          en: "Is there a documented environmental policy covering waste and emissions?",
          es: "¿Existe una política ambiental documentada que cubra residuos y emisiones?",
          severity: "MAJOR",
        },
        {
          en: "Are environmental permits and licenses current and displayed?",
          es: "¿Los permisos y licencias ambientales están vigentes y exhibidos?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "SMETA Pillar 3: Environment",
      section_es: "SMETA Pilar 3: Ambiente",
      subsection: "3.2 Waste Management",
      subsection_es: "3.2 Gestión de Residuos",
      questions: [
        {
          en: "Is waste segregated, stored appropriately, and disposed safely?",
          es: "¿Se segrega, almacena y dispone adecuadamente de los residuos?",
          severity: "MAJOR",
        },
        {
          en: "Are hazardous wastes handled and disposed per local regulations?",
          es: "¿Se manejan y disponen residuos peligrosos según normativas locales?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "SMETA Pillar 4: Business Ethics",
      section_es: "SMETA Pilar 4: Ética Empresarial",
      subsection: "4.1 Compliance and Governance",
      subsection_es: "4.1 Cumplimiento y Gobernanza",
      questions: [
        {
          en: "Does the facility have documented procedures for legal compliance?",
          es: "¿La instalación tiene procedimientos documentados para cumplimiento legal?",
          severity: "MAJOR",
        },
        {
          en: "Are there controls to prevent bribery and corruption?",
          es: "¿Hay controles para prevenir soborno y corrupción?",
          severity: "MAJOR",
        },
        {
          en: "Are regular internal audits conducted?",
          es: "¿Se realizan auditorías internas regulares?",
          severity: "MINOR",
        },
      ],
    },
  ],
};

async function main() {
  console.log("🌱 Seeding bilingual audit templates...");

  await prisma.auditQuestion.deleteMany({});

  const auditTypes = await Promise.all([
    prisma.auditType.upsert({
      where: { code: "SMETA" },
      update: {},
      create: { code: "SMETA", name: "SMETA Audit (4 Pillars)", description: "Sedex Members Ethical Trade Audit", checklist: {} },
    }),
  ]);

  let totalQuestions = 0;

  for (const [typeCode, sections] of Object.entries(QUESTIONS_WITH_TRANSLATIONS)) {
    const auditType = auditTypes.find((at) => at.code === typeCode);
    if (!auditType) continue;

    for (const section of sections) {
      for (const q of section.questions) {
        await prisma.auditQuestion.create({
          data: {
            auditTypeId: auditType.id,
            section: section.section,
            section_es: section.section_es,
            subsection: section.subsection,
            subsection_es: section.subsection_es,
            question: q.en,
            question_es: q.es,
            scoringType: "BINARY",
            autoFindingIfNo: true,
            findingSeverity: q.severity,
            weight: q.severity === "CRITICAL" ? 3 : q.severity === "MAJOR" ? 2 : 1,
          },
        });
        totalQuestions++;
      }
    }
    console.log(`✅ Seeded ${typeCode} (${sections.length} sections, ${totalQuestions} questions)`);
  }

  console.log(`✨ Seed complete! Total: ${totalQuestions} bilingual questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
