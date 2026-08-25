import Link from 'next/link'
import { BrandedFooter } from '@/components/branded-footer'
import { ChaosToOrder } from '@/components/motion/chaos-to-order'
import { ScrollReveal } from '@/components/motion/scroll-reveal'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-lg font-bold text-primary-foreground">
              ✓
            </div>
            <h1 className="font-black text-base text-foreground">AuditorIA</h1>
          </div>

          <nav className="hidden md:flex gap-12 text-sm font-medium text-muted-foreground">
            <Link href="#diferenciadores" className="hover:text-foreground transition">
              Diferenciadores
            </Link>
            <Link href="#precios" className="hover:text-foreground transition">
              Precios
            </Link>
          </nav>

          <div className="flex gap-4">
            <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Login
            </Link>
            <Link href="/auth/register" className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition rounded-lg">
              Accede Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* HERO — Tipografía + Canvas (Opción D) */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Typography */}
              <div data-reveal className="space-y-8">
                <h1 className="text-6xl md:text-7xl font-black leading-tight text-foreground">
                  Auditorías<br />
                  sin caos.
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Hallazgos centralizados. Trazabilidad inmutable. Compliance completo. El auditor moderno no pasa 2 semanas en Excel.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/register"
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-center hover:opacity-90 transition"
                  >
                    Centraliza tus hallazgos
                  </Link>
                  <Link
                    href="#diferenciadores"
                    className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold text-center hover:bg-primary/5 transition"
                  >
                    Ver cómo funciona
                  </Link>
                </div>

                <p className="text-sm text-muted-foreground pt-4">
                  Sin tarjeta. Sin compromiso. Acceso instantáneo.
                </p>
              </div>

              {/* Right: Canvas Animation */}
              <div data-reveal className="flex justify-center">
                <div className="w-full max-w-sm">
                  <ChaosToOrder width={360} height={280} className="drop-shadow-lg" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DIFERENCIADORES — Tres pilares */}
      <section id="diferenciadores" className="py-24 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-20">
            <div data-reveal className="max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                Lo que nadie más ofrece.
              </h2>
              <p className="text-lg text-muted-foreground">
                Tres diferenciadores que cambian cómo se hacen auditorías.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12">
            {/* 1. Trazabilidad */}
            <ScrollReveal>
              <div data-reveal className="space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-black text-primary">①</span>
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  Trazabilidad Inmutable
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  El regulador pregunta: <em>"¿Quién cambió la severidad? ¿Cuándo? ¿Por qué?"</em> Con AuditorIA, tienes la respuesta en 2 segundos.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 font-mono text-xs space-y-2 overflow-x-auto">
                  <div className="text-primary font-black">2026-01-15 09:30 — Created NC-001</div>
                  <div className="text-warning font-black">2026-01-15 14:00 — MINOR → CRITICAL</div>
                  <div className="text-success font-black">2026-02-20 08:00 — CAP validated</div>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Auto-Organización */}
            <ScrollReveal>
              <div data-reveal className="space-y-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-black text-success">②</span>
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  Documentos Automáticos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tu Google Drive se ordena solo. Hallazgos renombrados, CAPs linkados, reporte en su lugar. Los datos siguen siendo tuyos.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                  <div className="text-destructive text-xs font-mono mb-3">
                    ❌ IMG_001.jpg<br/>
                    Captura_pantalla.png<br/>
                    reporte_FINAL_v3.pdf
                  </div>
                  <div className="text-success text-xs font-mono">
                    ✓ 2026/SMETA_ACME/<br/>
                    &nbsp;&nbsp;01_Hallazgos/<br/>
                    &nbsp;&nbsp;02_CAPs/<br/>
                    &nbsp;&nbsp;03_Reporte/
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Acceso QR */}
            <ScrollReveal>
              <div data-reveal className="space-y-6">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-black text-info">③</span>
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  Acceso Temporal QR
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Auditor externo. Genera QR. Escanea. Acceso inmediato sin crear usuario. Auto-revocación en 7 días.
                </p>
                <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center">
                  <p className="text-xs text-muted-foreground mb-3">Token único</p>
                  <div className="w-24 h-24 bg-foreground/5 rounded-lg flex items-center justify-center mb-4 border-2 border-primary/30">
                    <p className="text-sm font-black text-primary">AUD-7F3K</p>
                  </div>
                  <p className="text-xs text-success font-black">Válido 7 días</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-16">
            <div data-reveal className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                Precios escalables
              </h2>
              <p className="text-lg text-muted-foreground">
                Paga solo por lo que usas. Usuarios en bandas + auditorías lineales.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div data-reveal className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-bold text-foreground">Tipo</th>
                    <th className="text-left py-4 px-4 font-bold text-foreground">Usuarios</th>
                    <th className="text-left py-4 px-4 font-bold text-foreground">Auditorías/mes</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition">
                    <td className="py-4 px-4 text-foreground font-semibold">PyME</td>
                    <td className="py-4 px-4 text-muted-foreground">2-5</td>
                    <td className="py-4 px-4 text-muted-foreground">1-5</td>
                    <td className="py-4 px-4 text-right">$13-$93</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition bg-primary/5">
                    <td className="py-4 px-4 text-foreground font-semibold">Firma Auditora</td>
                    <td className="py-4 px-4 text-muted-foreground">6-10</td>
                    <td className="py-4 px-4 text-muted-foreground">10-50</td>
                    <td className="py-4 px-4 text-right font-bold text-primary">$25-$1,000</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition">
                    <td className="py-4 px-4 text-foreground font-semibold">Corporación</td>
                    <td className="py-4 px-4 text-muted-foreground">11-50</td>
                    <td className="py-4 px-4 text-muted-foreground">50-100</td>
                    <td className="py-4 px-4 text-right">$125-$2,105</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition">
                    <td className="py-4 px-4 text-foreground font-semibold">Acceso temporal</td>
                    <td className="py-4 px-4 text-muted-foreground">Auditor externo</td>
                    <td className="py-4 px-4 text-muted-foreground">7 días</td>
                    <td className="py-4 px-4 text-right text-success font-bold">Gratis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div data-reveal className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-foreground">
                Auditorías más inteligentes, hoy.
              </h2>
              <p className="text-lg text-muted-foreground">
                Sin tarjeta. Sin compromiso. Acceso instantáneo con 1 auditoría + 1 usuario.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition"
                >
                  Centraliza tus hallazgos
                </Link>
                <Link
                  href="mailto:hola@auditoria.app"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition"
                >
                  Contactar equipo
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <BrandedFooter />
    </main>
  )
}
