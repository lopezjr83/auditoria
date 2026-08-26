import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COMPLETE_QUESTIONS = {
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
      ],
    },
  ],
  ISO_9001: [
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "4.1 Understanding the Organization and Its Context",
      subsection_es: "4.1 Comprensión de la Organización y su Contexto",
      questions: [
        {
          en: "Has the organization determined external and internal issues relevant to its purpose?",
          es: "¿Ha determinado la organización los temas externos e internos relevantes a su propósito?",
          severity: "MAJOR",
        },
        {
          en: "Are the needs and expectations of interested parties identified and monitored?",
          es: "¿Se identifican y monitorean las necesidades de las partes interesadas?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "4.2 Quality Management System Scope",
      subsection_es: "4.2 Alcance del Sistema de Gestión de Calidad",
      questions: [
        {
          en: "Has a QMS been established for consistent delivery of conforming products/services?",
          es: "¿Se ha establecido un SGC para garantizar entrega consistente de productos/servicios conformes?",
          severity: "CRITICAL",
        },
        {
          en: "Are all required processes identified and their interactions determined?",
          es: "¿Se identifican todos los procesos requeridos y se determinan sus interacciones?",
          severity: "MAJOR",
        },
        {
          en: "Is there documented information for QMS processes?",
          es: "¿Existe información documentada para los procesos del SGC?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "5.1 Leadership and Commitment",
      subsection_es: "5.1 Liderazgo y Compromiso",
      questions: [
        {
          en: "Does top management demonstrate commitment to the QMS?",
          es: "¿Demuestra la alta dirección compromiso con el SGC?",
          severity: "MAJOR",
        },
        {
          en: "Is a quality policy established and communicated throughout the organization?",
          es: "¿Se establece una política de calidad y se comunica en toda la organización?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "6.1 Planning for Change",
      subsection_es: "6.1 Planificación del Cambio",
      questions: [
        {
          en: "Has the organization planned for changes to the QMS?",
          es: "¿Ha planificado la organización cambios al SGC?",
          severity: "MINOR",
        },
        {
          en: "Are risks and opportunities identified and assessed?",
          es: "¿Se identifican y evalúan riesgos y oportunidades?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "7.1 Resources",
      subsection_es: "7.1 Recursos",
      questions: [
        {
          en: "Are necessary infrastructure and work environment resources provided?",
          es: "¿Se proporcionan recursos de infraestructura y ambiente de trabajo necesarios?",
          severity: "MAJOR",
        },
        {
          en: "Are competent personnel appointed and their competence maintained?",
          es: "¿Se designan personal competente y se mantiene su competencia?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "8.1 Operational Planning and Control",
      subsection_es: "8.1 Planificación y Control Operacional",
      questions: [
        {
          en: "Are processes for product/service provision planned and controlled?",
          es: "¿Se planifican y controlan los procesos de provisión de productos/servicios?",
          severity: "MAJOR",
        },
        {
          en: "Are requirements for products/services defined and communicated?",
          es: "¿Se definen y comunican los requisitos de productos/servicios?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 9001: Quality Management System",
      section_es: "ISO 9001: Sistema de Gestión de Calidad",
      subsection: "9.1 Monitoring and Measurement",
      subsection_es: "9.1 Monitoreo y Medición",
      questions: [
        {
          en: "Are processes monitored for effectiveness and conformity?",
          es: "¿Se monitorean los procesos para efectividad y conformidad?",
          severity: "MAJOR",
        },
        {
          en: "Are customer satisfaction metrics tracked and analyzed?",
          es: "¿Se rastrean y analizan las métricas de satisfacción del cliente?",
          severity: "MAJOR",
        },
      ],
    },
  ],
  ISO_14001: [
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "4.1 Understanding Environmental Context",
      subsection_es: "4.1 Comprensión del Contexto Ambiental",
      questions: [
        {
          en: "Has the organization determined environmental aspects and their impacts?",
          es: "¿Ha determinado la organización los aspectos ambientales y sus impactos?",
          severity: "CRITICAL",
        },
        {
          en: "Are the organization's environmental obligations identified?",
          es: "¿Se identifican las obligaciones ambientales de la organización?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "4.2 Environmental Management System",
      subsection_es: "4.2 Sistema de Gestión Ambiental",
      questions: [
        {
          en: "Has an EMS been established and documented?",
          es: "¿Se ha establecido y documentado un SGA?",
          severity: "CRITICAL",
        },
        {
          en: "Are all required processes for environmental management defined?",
          es: "¿Se definen todos los procesos requeridos para gestión ambiental?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "5.1 Leadership and Environmental Policy",
      subsection_es: "5.1 Liderazgo y Política Ambiental",
      questions: [
        {
          en: "Is there a documented environmental policy communicated and understood?",
          es: "¿Existe una política ambiental documentada, comunicada y entendida?",
          severity: "CRITICAL",
        },
        {
          en: "Does top management demonstrate commitment to environmental performance?",
          es: "¿Demuestra la alta dirección compromiso con el desempeño ambiental?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "6.1 Planning for Environmental Aspects",
      subsection_es: "6.1 Planificación de Aspectos Ambientales",
      questions: [
        {
          en: "Are environmental aspects and impacts assessed systematically?",
          es: "¿Se evalúan los aspectos e impactos ambientales sistemáticamente?",
          severity: "CRITICAL",
        },
        {
          en: "Are significant environmental aspects identified and prioritized?",
          es: "¿Se identifican y priorizan los aspectos ambientales significativos?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "8.1 Operational Planning and Control",
      subsection_es: "8.1 Planificación y Control Operacional",
      questions: [
        {
          en: "Are operational controls established for significant environmental aspects?",
          es: "¿Se establecen controles operacionales para aspectos ambientales significativos?",
          severity: "MAJOR",
        },
        {
          en: "Are emergency procedures documented for environmental incidents?",
          es: "¿Se documentan procedimientos de emergencia para incidentes ambientales?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "ISO 14001: Environmental Management System",
      section_es: "ISO 14001: Sistema de Gestión Ambiental",
      subsection: "9.1 Monitoring and Measurement",
      subsection_es: "9.1 Monitoreo y Medición",
      questions: [
        {
          en: "Are environmental KPIs monitored and measured regularly?",
          es: "¿Se monitorean y miden regularmente los KPIs ambientales?",
          severity: "MAJOR",
        },
        {
          en: "Are monitoring results documented and analyzed for improvements?",
          es: "¿Se documentan y analizan los resultados para mejoras?",
          severity: "MAJOR",
        },
      ],
    },
  ],
  ISO_45001: [
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "4.1 Understanding the Organization and Its Context",
      subsection_es: "4.1 Comprensión de la Organización y su Contexto",
      questions: [
        {
          en: "Has the organization determined hazards and risks relevant to OH&S performance?",
          es: "¿Ha determinado la organización peligros y riesgos relevantes al desempeño de SSO?",
          severity: "CRITICAL",
        },
        {
          en: "Are the organization's legal and regulatory OH&S obligations identified?",
          es: "¿Se identifican las obligaciones legales y regulatorias de SSO?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "4.2 Occupational Health & Safety Management System",
      subsection_es: "4.2 Sistema de Gestión de SSO",
      questions: [
        {
          en: "Has an OH&S management system been established and documented?",
          es: "¿Se ha establecido y documentado un sistema de gestión de SSO?",
          severity: "CRITICAL",
        },
        {
          en: "Are all required OH&S processes defined and implemented?",
          es: "¿Se definen e implementan todos los procesos requeridos de SSO?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "5.1 Leadership and OH&S Policy",
      subsection_es: "5.1 Liderazgo y Política de SSO",
      questions: [
        {
          en: "Is there a documented OH&S policy communicated throughout the organization?",
          es: "¿Existe una política de SSO documentada y comunicada en toda la organización?",
          severity: "CRITICAL",
        },
        {
          en: "Does top management demonstrate commitment to OH&S?",
          es: "¿Demuestra la alta dirección compromiso con la SSO?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "6.1 Hazard Identification and Risk Assessment",
      subsection_es: "6.1 Identificación de Peligros y Evaluación de Riesgos",
      questions: [
        {
          en: "Are hazards identified systematically and at regular intervals?",
          es: "¿Se identifican peligros sistemáticamente y en intervalos regulares?",
          severity: "CRITICAL",
        },
        {
          en: "Are risks assessed and controls implemented for significant risks?",
          es: "¿Se evalúan riesgos e implementan controles para riesgos significativos?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "7.2 Competence and Awareness",
      subsection_es: "7.2 Competencia y Conciencia",
      questions: [
        {
          en: "Are workers competent and provided with adequate training?",
          es: "¿Son los trabajadores competentes y reciben capacitación adecuada?",
          severity: "MAJOR",
        },
        {
          en: "Is OH&S awareness communicated and maintained?",
          es: "¿Se comunica y mantiene la conciencia de SSO?",
          severity: "MAJOR",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "8.1 Operational Planning and Control",
      subsection_es: "8.1 Planificación y Control Operacional",
      questions: [
        {
          en: "Are operational controls established for identified hazards?",
          es: "¿Se establecen controles operacionales para peligros identificados?",
          severity: "CRITICAL",
        },
        {
          en: "Are emergency procedures documented, communicated, and tested?",
          es: "¿Se documentan, comunican y prueban procedimientos de emergencia?",
          severity: "CRITICAL",
        },
      ],
    },
    {
      section: "ISO 45001: Occupational Health & Safety Management",
      section_es: "ISO 45001: Gestión de Salud y Seguridad Ocupacional",
      subsection: "9.1 Monitoring and Performance Evaluation",
      subsection_es: "9.1 Monitoreo y Evaluación del Desempeño",
      questions: [
        {
          en: "Are OH&S key performance indicators monitored and measured?",
          es: "¿Se monitorean y miden los KPIs de SSO?",
          severity: "MAJOR",
        },
        {
          en: "Are incident investigations conducted and corrective actions tracked?",
          es: "¿Se realizan investigaciones de incidentes y se rastrean acciones correctivas?",
          severity: "CRITICAL",
        },
      ],
    },
  ],
};

async function main() {
  console.log("🌱 Seeding complete bilingual audit templates...");

  await prisma.auditQuestion.deleteMany({});

  const auditTypes = await Promise.all([
    prisma.auditType.upsert({
      where: { code: "SMETA" },
      update: {},
      create: { code: "SMETA", name: "SMETA Audit (4 Pillars)", description: "Sedex Members Ethical Trade Audit", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_9001" },
      update: {},
      create: { code: "ISO_9001", name: "ISO 9001:2015", description: "Quality Management System", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_14001" },
      update: {},
      create: { code: "ISO_14001", name: "ISO 14001:2015", description: "Environmental Management System", checklist: {} },
    }),
    prisma.auditType.upsert({
      where: { code: "ISO_45001" },
      update: {},
      create: { code: "ISO_45001", name: "ISO 45001:2018", description: "Occupational Health & Safety Management", checklist: {} },
    }),
  ]);

  let totalQuestions = 0;

  for (const [typeCode, sections] of Object.entries(COMPLETE_QUESTIONS)) {
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
    console.log(`✅ Seeded ${typeCode}`);
  }

  console.log(`✨ Complete! Total: ${totalQuestions} bilingual questions`);
  console.log("- SMETA: 31 questions (4 Pillars)");
  console.log("- ISO 9001: 16 questions");
  console.log("- ISO 14001: 12 questions");
  console.log("- ISO 45001: 14 questions");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
