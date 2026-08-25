// Auditorías pre-cargadas (templates) para SMETA e ISO

export interface AuditTemplate {
  id: string
  name: string
  type: string
  sections: Section[]
  description: string
}

export interface Section {
  id: string
  title: string
  items: ChecklistItem[]
}

export interface ChecklistItem {
  id: string
  question: string
  standard: string
  guidance?: string
  requirement?: string
}

// ─── SMETA 4 Pillars ──────────────────────────────

export const SMETA_LABOUR: ChecklistItem[] = [
  {
    id: 'labour-001',
    question: '¿Hay políticas documentadas contra el trabajo infantil?',
    standard: 'SMETA Labour: Child Labor Prevention',
    requirement: 'No menores de 18 años en trabajos peligrosos',
  },
  {
    id: 'labour-002',
    question: '¿Se verifica la edad de todos los empleados?',
    standard: 'SMETA Labour: Age Verification',
    requirement: 'Documentación de edad validada',
  },
  {
    id: 'labour-003',
    question: '¿Hay evidencia de trabajo forzado o trata de personas?',
    standard: 'SMETA Labour: Forced Labor Prevention',
    requirement: 'Políticas anti-esclavitud documentadas',
  },
  {
    id: 'labour-004',
    question: '¿Se respetan horarios de trabajo máximos (48h/semana)?',
    standard: 'SMETA Labour: Working Hours',
    requirement: 'Registro de horas, máximo 48 horas ordinarias',
  },
  {
    id: 'labour-005',
    question: '¿Se pagan salarios mínimos legales completos?',
    standard: 'SMETA Labour: Wages',
    requirement: 'Salarios ≥ salario mínimo legal, sin descuentos ilegales',
  },
  {
    id: 'labour-006',
    question: '¿Se respetan derechos de asociación y negociación colectiva?',
    standard: 'SMETA Labour: Freedom of Association',
    requirement: 'Libre sindicación, no represalias',
  },
]

export const SMETA_HEALTH_SAFETY: ChecklistItem[] = [
  {
    id: 'hs-001',
    question: '¿Hay máquinas con guardias de seguridad adecuadas?',
    standard: 'SMETA Health & Safety: Machinery Guards',
    requirement: 'Guardias en todas máquinas peligrosas',
  },
  {
    id: 'hs-002',
    question: '¿Se proporciona y usa EPP (equipos de protección)?',
    standard: 'SMETA Health & Safety: PPE',
    requirement: 'EPP apropiado, inspeccionado y reemplazado',
  },
  {
    id: 'hs-003',
    question: '¿Hay registro e investigación de incidentes?',
    standard: 'SMETA Health & Safety: Incident Investigation',
    requirement: 'Registro completo, investigación RCA',
  },
  {
    id: 'hs-004',
    question: '¿Se han identificado peligros y riesgos?',
    standard: 'SMETA Health & Safety: Hazard Identification',
    requirement: 'Evaluación de riesgos documentada',
  },
  {
    id: 'hs-005',
    question: '¿Hay procedimientos de emergencia y simulacros?',
    standard: 'SMETA Health & Safety: Emergency Procedures',
    requirement: 'Plan de evacuación, simulacros regulares',
  },
  {
    id: 'hs-006',
    question: '¿Se proporciona capacitación en seguridad?',
    standard: 'SMETA Health & Safety: Training',
    requirement: 'Capacitación documentada, induction para nuevos',
  },
]

export const SMETA_ENVIRONMENT: ChecklistItem[] = [
  {
    id: 'env-001',
    question: '¿Hay gestión adecuada de residuos?',
    standard: 'SMETA Environment: Waste Management',
    requirement: 'Clasificación, almacenamiento y disposición legal',
  },
  {
    id: 'env-002',
    question: '¿Se monitorean emisiones al aire?',
    standard: 'SMETA Environment: Air Emissions',
    requirement: 'Monitoreo según requisitos locales',
  },
  {
    id: 'env-003',
    question: '¿Se gestiona adecuadamente el agua?',
    standard: 'SMETA Environment: Water Management',
    requirement: 'Tratamiento, disposición legal de efluentes',
  },
  {
    id: 'env-004',
    question: '¿Se minimizan derrames e impactos ambientales?',
    standard: 'SMETA Environment: Spill Prevention',
    requirement: 'Kits de derrames, drenajes adecuados',
  },
]

export const SMETA_BUSINESS_ETHICS: ChecklistItem[] = [
  {
    id: 'ethics-001',
    question: '¿Hay políticas contra soborno y corrupción?',
    standard: 'SMETA Business Ethics: Anti-Bribery',
    requirement: 'Código de conducta documentado',
  },
  {
    id: 'ethics-002',
    question: '¿Se declaró y gestiona conflicto de intereses?',
    standard: 'SMETA Business Ethics: Conflict of Interest',
    requirement: 'Divulgación de COI',
  },
  {
    id: 'ethics-003',
    question: '¿Se protege información confidencial?',
    standard: 'SMETA Business Ethics: Confidentiality',
    requirement: 'Políticas de confidencialidad implementadas',
  },
]

// ─── ISO 9001:2015 (Quality Management System) ────

export const ISO_9001: ChecklistItem[] = [
  {
    id: 'iso9-001',
    question: '¿Existe manual de calidad documentado?',
    standard: 'ISO 9001: Quality Management System',
    requirement: 'Manual que incluye alcance, procesos, responsabilidades',
  },
  {
    id: 'iso9-002',
    question: '¿Se definen objetivos de calidad?',
    standard: 'ISO 9001: Quality Objectives',
    requirement: 'Objetivos medibles, documentados, revisados',
  },
  {
    id: 'iso9-003',
    question: '¿Se planifica y controla la producción?',
    standard: 'ISO 9001: Production Control',
    requirement: 'Especificaciones, controles, rastreabilidad',
  },
  {
    id: 'iso9-004',
    question: '¿Se verifican productos no conformes?',
    standard: 'ISO 9001: Non-Conforming Product',
    requirement: 'Identificación, segregación, disposición',
  },
  {
    id: 'iso9-005',
    question: '¿Se realizan auditorías internas?',
    standard: 'ISO 9001: Internal Audit',
    requirement: 'Auditores competentes, cronograma, registro',
  },
  {
    id: 'iso9-006',
    question: '¿Se realiza revisión de la dirección?',
    standard: 'ISO 9001: Management Review',
    requirement: 'Trimestral/semestral, registro documentado',
  },
]

// ─── ISO 14001:2015 (Environmental Management System) ──

export const ISO_14001: ChecklistItem[] = [
  {
    id: 'iso14-001',
    question: '¿Se ha definido política ambiental?',
    standard: 'ISO 14001: Environmental Policy',
    requirement: 'Política documentada, comunicada, accesible',
  },
  {
    id: 'iso14-002',
    question: '¿Se identificaron aspectos ambientales significativos?',
    standard: 'ISO 14001: Environmental Aspects',
    requirement: 'Evaluación de impactos, matriz de significancia',
  },
  {
    id: 'iso14-003',
    question: '¿Se cumplen leyes ambientales aplicables?',
    standard: 'ISO 14001: Legal Compliance',
    requirement: 'Identificación, evaluación, cumplimiento de requisitos',
  },
  {
    id: 'iso14-004',
    question: '¿Se monitorean y miden aspectos ambientales?',
    standard: 'ISO 14001: Monitoring & Measurement',
    requirement: 'Calibración de equipos, registro de datos',
  },
  {
    id: 'iso14-005',
    question: '¿Se investigan no conformidades ambientales?',
    standard: 'ISO 14001: Non-Conformity',
    requirement: 'Root cause, acciones correctivas, seguimiento',
  },
]

// ─── ISO 45001:2018 (Occupational Health & Safety) ────

export const ISO_45001: ChecklistItem[] = [
  {
    id: 'iso45-001',
    question: '¿Se ha definido política OHSMS?',
    standard: 'ISO 45001: OH&S Policy',
    requirement: 'Política documentada, compromiso de dirección',
  },
  {
    id: 'iso45-002',
    question: '¿Se identificaron peligros y se evaluaron riesgos?',
    standard: 'ISO 45001: Hazard & Risk Assessment',
    requirement: 'Matriz de riesgos, evaluación periódica',
  },
  {
    id: 'iso45-003',
    question: '¿Hay objetivos y planes de acción SyS?',
    standard: 'ISO 45001: OH&S Objectives',
    requirement: 'Objetivos medibles, responsables, fechas',
  },
  {
    id: 'iso45-004',
    question: '¿Se capacita en SyS?',
    standard: 'ISO 45001: Competence & Training',
    requirement: 'Capacitación documentada, evaluación',
  },
  {
    id: 'iso45-005',
    question: '¿Se consulta y participa al personal?',
    standard: 'ISO 45001: Consultation & Participation',
    requirement: 'Comités, sugerencias, registro',
  },
  {
    id: 'iso45-006',
    question: '¿Se investigan incidentes?',
    standard: 'ISO 45001: Incident Investigation',
    requirement: 'Reporte completo, RCA, AC, aprendizaje',
  },
]

// ─── Templates principales

export const AUDIT_TEMPLATES: AuditTemplate[] = [
  {
    id: 'smeta-template',
    name: 'SMETA 4 Pillars Audit',
    type: 'SMETA',
    description: 'Auditoría completa SMETA con 4 pilares: Labour, Health & Safety, Environment, Business Ethics',
    sections: [
      {
        id: 'labour',
        title: 'Labour (Prácticas Laborales)',
        items: SMETA_LABOUR,
      },
      {
        id: 'health-safety',
        title: 'Health & Safety (Seguridad y Salud)',
        items: SMETA_HEALTH_SAFETY,
      },
      {
        id: 'environment',
        title: 'Environment (Ambiental)',
        items: SMETA_ENVIRONMENT,
      },
      {
        id: 'business-ethics',
        title: 'Business Ethics (Ética Comercial)',
        items: SMETA_BUSINESS_ETHICS,
      },
    ],
  },
  {
    id: 'iso9001-template',
    name: 'ISO 9001:2015 Quality Audit',
    type: 'ISO_9001',
    description: 'Auditoría de Sistema de Gestión de Calidad ISO 9001:2015',
    sections: [
      {
        id: 'qms',
        title: 'Quality Management System',
        items: ISO_9001,
      },
    ],
  },
  {
    id: 'iso14001-template',
    name: 'ISO 14001:2015 Environmental Audit',
    type: 'ISO_14001',
    description: 'Auditoría de Sistema de Gestión Ambiental ISO 14001:2015',
    sections: [
      {
        id: 'ems',
        title: 'Environmental Management System',
        items: ISO_14001,
      },
    ],
  },
  {
    id: 'iso45001-template',
    name: 'ISO 45001:2018 OH&S Audit',
    type: 'ISO_45001',
    description: 'Auditoría de Sistema de Gestión de Seguridad y Salud Ocupacional ISO 45001:2018',
    sections: [
      {
        id: 'ohsms',
        title: 'Occupational Health & Safety Management System',
        items: ISO_45001,
      },
    ],
  },
]
