import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AUDIT_QUESTIONS = {
  SMETA: [
    // Pillar 1: Labour
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.1 Child Labour",
      question: "Is there written confirmation that all workers are above the minimum working age?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.1 Child Labour",
      question: "Are all workers required to provide proof of age upon employment?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.2 Forced Labour",
      question: "Are workers free to leave employment with no more than 30 days notice?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.2 Forced Labour",
      question: "Are identity documents held by the company or withheld from workers?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.3 Freedom of Association",
      question: "Are workers allowed to associate freely and collectively bargain?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.4 Wages & Benefits",
      question: "Are workers paid at least the national minimum wage?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.4 Wages & Benefits",
      question: "Are wages paid regularly (at least monthly) with documented pay slips?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 1: Labour",
      subsection: "1.5 Working Hours",
      question: "Are regular working hours limited to maximum 48 hours per week?",
      severity: "MAJOR",
    },
    // Pillar 2: Health & Safety
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.1 H&S Management",
      question: "Is there a documented health and safety policy covering all operations?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.1 H&S Management",
      question: "Is there a designated health and safety officer or committee?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.1 H&S Management",
      question: "Are hazard assessments conducted regularly with documented results?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.2 PPE",
      question: "Is appropriate PPE provided to all workers at no cost?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.2 PPE",
      question: "Are workers trained on correct use and maintenance of PPE?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.3 Machinery & Equipment",
      question: "Are all machinery and equipment maintained in safe working condition?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 2: Health & Safety",
      subsection: "2.3 Machinery & Equipment",
      question: "Are guards in place on moving parts and sharp edges?",
      severity: "CRITICAL",
    },
    // Pillar 3: Environment
    {
      section: "SMETA Pillar 3: Environment",
      subsection: "3.1 Environmental Management",
      question: "Is there a documented environmental policy covering waste and emissions?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 3: Environment",
      subsection: "3.1 Environmental Management",
      question: "Are environmental permits and licenses current and displayed?",
      severity: "CRITICAL",
    },
    {
      section: "SMETA Pillar 3: Environment",
      subsection: "3.2 Waste Management",
      question: "Is waste segregated, stored appropriately, and disposed of safely?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 3: Environment",
      subsection: "3.2 Waste Management",
      question: "Are hazardous wastes handled and disposed according to local regulations?",
      severity: "CRITICAL",
    },
    // Pillar 4: Business Ethics
    {
      section: "SMETA Pillar 4: Business Ethics",
      subsection: "4.1 Compliance & Governance",
      question: "Does the facility have documented procedures for compliance with all applicable laws?",
      severity: "MAJOR",
    },
    {
      section: "SMETA Pillar 4: Business Ethics",
      subsection: "4.1 Compliance & Governance",
      question: "Are there controls to prevent bribery and corruption?",
      severity: "MAJOR",
    },
  ],
  ISO_9001: [
    {
      section: "ISO 9001: Quality Management",
      subsection: "4.1 Context",
      question: "Has the organization determined external and internal issues relevant to its purpose?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "4.2 QMS Scope",
      question: "Has a quality management system been established to ensure consistent delivery?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "4.2 QMS Scope",
      question: "Are all required processes identified and their interactions determined?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "5.1 Leadership",
      question: "Does top management demonstrate commitment to the QMS?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "5.2 Quality Policy",
      question: "Is a quality policy established, understood, and communicated?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "6.1 Planning",
      question: "Are risks and opportunities identified and assessed?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "7.1 Resources",
      question: "Are necessary resources provided for the QMS?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "7.2 Competence",
      question: "Are competent personnel appointed and their competence maintained?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "8.1 Operational Planning",
      question: "Are processes for product/service provision planned and controlled?",
      severity: "MAJOR",
    },
    {
      section: "ISO 9001: Quality Management",
      subsection: "8.2 Customer Focus",
      question: "Are requirements for products/services defined and communicated?",
      severity: "MAJOR",
    },
  ],
  ISO_14001: [
    {
      section: "ISO 14001: Environmental Management",
      subsection: "4.1 Context",
      question: "Has the organization determined environmental aspects and impacts?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "4.2 Legal Obligations",
      question: "Are organizational environmental obligations (legal/regulatory) identified?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "4.2 EMS Scope",
      question: "Has an environmental management system been established and documented?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "5.1 Leadership",
      question: "Does top management demonstrate commitment to environmental performance?",
      severity: "MAJOR",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "5.2 Environmental Policy",
      question: "Is there a documented environmental policy that is communicated?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "6.1 Environmental Aspects",
      question: "Are environmental aspects and impacts assessed systematically?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "6.2 Legal Compliance",
      question: "Are legal and regulatory requirements identified and tracked?",
      severity: "MAJOR",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "8.1 Operational Control",
      question: "Are operational controls established for significant environmental aspects?",
      severity: "MAJOR",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "8.2 Emergency Preparedness",
      question: "Are emergency procedures documented for environmental incidents?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 14001: Environmental Management",
      subsection: "9.1 Monitoring",
      question: "Are environmental key performance indicators monitored regularly?",
      severity: "MAJOR",
    },
  ],
  ISO_45001: [
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "4.1 Context",
      question: "Has the organization determined hazards and risks relevant to its OH&S performance?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "4.2 Legal Obligations",
      question: "Are organizational legal and regulatory OH&S obligations identified?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "4.2 SMS Scope",
      question: "Has an OH&S management system been established and documented?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "5.1 Leadership",
      question: "Does top management demonstrate commitment to OH&S?",
      severity: "MAJOR",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "5.2 OH&S Policy",
      question: "Is there a documented OH&S policy communicated throughout?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "6.1 Hazard Identification",
      question: "Are hazards identified systematically at regular intervals?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "6.2 Risk Assessment",
      question: "Are risks assessed and controls implemented for significant risks?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "7.2 Competence",
      question: "Are workers competent and provided with adequate training?",
      severity: "MAJOR",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "8.1 Operational Control",
      question: "Are operational controls established for identified hazards?",
      severity: "CRITICAL",
    },
    {
      section: "ISO 45001: Occupational Health & Safety",
      subsection: "8.2 Emergency Procedures",
      question: "Are emergency procedures documented, communicated, and tested?",
      severity: "CRITICAL",
    },
  ],
};

async function main() {
  console.log("🌱 Seeding audit templates and questions...");

  // Clear in correct order to respect foreign keys
  await prisma.auditQuestion.deleteMany({});

  const auditTypes = await Promise.all([
    prisma.auditType.upsert({
      where: { code: "SMETA" },
      update: { name: "SMETA Audit (4 Pillars)", description: "Sedex Members Ethical Trade Audit" },
      create: { code: "SMETA", name: "SMETA Audit (4 Pillars)", description: "Sedex Members Ethical Trade Audit", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_9001" },
      update: { name: "ISO 9001:2015", description: "Quality Management System" },
      create: { code: "ISO_9001", name: "ISO 9001:2015", description: "Quality Management System", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_14001" },
      update: { name: "ISO 14001:2015", description: "Environmental Management System" },
      create: { code: "ISO_14001", name: "ISO 14001:2015", description: "Environmental Management System", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_45001" },
      update: { name: "ISO 45001:2018", description: "Occupational Health & Safety Management" },
      create: { code: "ISO_45001", name: "ISO 45001:2018", description: "Occupational Health & Safety Management", checklist: {} },
    }),
  ]);

  console.log(`✅ Created ${auditTypes.length} audit types`);

  let totalQuestions = 0;
  for (const [typeCode, questions] of Object.entries(AUDIT_QUESTIONS)) {
    const auditType = auditTypes.find((at) => at.code === typeCode);
    if (!auditType) continue;

    for (const q of questions) {
      await prisma.auditQuestion.create({
        data: {
          auditTypeId: auditType.id,
          section: q.section,
          subsection: q.subsection,
          question: q.question,
          scoringType: "BINARY",
          autoFindingIfNo: true,
          findingSeverity: q.severity,
          weight: q.severity === "CRITICAL" ? 3 : q.severity === "MAJOR" ? 2 : 1,
        },
      });
      totalQuestions++;
    }
    console.log(`✅ Seeded ${questions.length} questions for ${typeCode}`);
  }

  console.log(`✨ Seed complete! Total questions: ${totalQuestions}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
